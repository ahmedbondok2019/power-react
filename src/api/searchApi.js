import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import { getProjectsPageData } from './projectsApi';
import { getServicesPageData } from './servicesApi';
import { getBlogs } from './blogsApi';

const STATIC_PAGES = [
  { title: 'الرئيسية', description: 'الصفحة الرئيسية لمجموعة باور للأعمال والمقاولات والتجهيزات', link: '/', type: 'page' },
  { title: 'من نحن', description: 'نبذة عن تاريخ الشركة، رؤيتنا، رسالتنا، وهيكل الإدارة وفريق العمل', link: '/about', type: 'page' },
  { title: 'خدماتنا', description: 'استكشف كافة الحلول الهندسية، الكهروميكانيكية والإنشائية المتكاملة', link: '/services', type: 'page' },
  { title: 'مشاريعنا', description: 'معرض المشاريع المنفذة والجارية في مختلف مناطق المملكة', link: '/projects', type: 'page' },
  { title: 'استراتيجياتنا', description: 'رؤية 2030، الاستدامة البيئية، الأبنية الخضراء، وتوطين الصناعة', link: '/strategy', type: 'page' },
  { title: 'المدونة والأخبار', description: 'أحدث المقالات الهندسية وأخبار قطاع المقاولات والإنشاءات', link: '/blogs', type: 'page' },
  { title: 'الوظائف والتوظيف', description: 'انضم إلى فريق عملنا المتميز وقدم على الوظائف الشاغرة', link: '/careers', type: 'page' },
  { title: 'اتصل بنا', description: 'تواصل مع فريق الدعم والاستشارات الفنية لطلب عروض الأسعار', link: '/contact', type: 'page' },
];

/**
 * Global Search API Function
 * Performs search against the backend API, with smart multi-source fallback
 * @param {string} query - The search query term
 * @returns {Promise<Object>} Categorized search results: { projects: [], services: [], blogs: [], pages: [] }
 */
export const searchGlobal = async (query) => {
  if (!query || !query.trim()) {
    return { projects: [], services: [], blogs: [], pages: [] };
  }

  const cleanQuery = query.trim().toLowerCase();

  // Try direct backend search API first
  try {
    const apiRes = await apiClient.get(ENDPOINTS.SEARCH, {
      params: { q: cleanQuery, query: cleanQuery }
    });

    if (apiRes?.data && (Array.isArray(apiRes.data) ? apiRes.data.length > 0 : Object.keys(apiRes.data).length > 0)) {
      return normalizeApiSearchResults(apiRes.data, cleanQuery);
    }
  } catch {
    // Fall through to multi-source aggregation fallback
  }

  // Multi-source aggregation search across cached or fresh API responses
  const [projectsRes, servicesRes, blogsRes] = await Promise.allSettled([
    getProjectsPageData(),
    getServicesPageData(),
    getBlogs(),
  ]);

  const results = {
    projects: [],
    services: [],
    blogs: [],
    pages: [],
  };

  // 1. Filter Projects
  if (projectsRes.status === 'fulfilled' && projectsRes.value) {
    const projectsData = projectsRes.value;
    const allProjects = [
      ...(projectsData.projects_section?.featured || []),
      ...(projectsData.projects_section?.tabs?.flatMap(t => t.items || []) || []),
      ...(projectsData.additional_projects?.items || []),
    ];

    const uniqueProjects = Array.from(new Map(allProjects.map(p => [p.id || p.title, p])).values());
    results.projects = uniqueProjects
      .filter((p) => {
        const title = (p.title || p.name || '').toLowerCase();
        const desc = (p.description || p.location || p.client || '').toLowerCase();
        const category = (p.category || '').toLowerCase();
        return title.includes(cleanQuery) || desc.includes(cleanQuery) || category.includes(cleanQuery);
      })
      .slice(0, 6)
      .map((p) => ({
        id: p.id,
        title: p.title || p.name,
        category: p.category || p.location || 'مشروع',
        image: p.image || p.img || '/projects-hero-bg.jpg',
        link: `/projects`,
        type: 'project',
      }));
  }

  // 2. Filter Services
  if (servicesRes.status === 'fulfilled' && servicesRes.value) {
    const servicesData = servicesRes.value;
    const serviceItems = [
      ...(servicesData.services_section?.items || []),
      ...(servicesData.services || []),
    ];

    const uniqueServices = Array.from(new Map(serviceItems.map(s => [s.id || s.title, s])).values());
    results.services = uniqueServices
      .filter((s) => {
        const title = (s.title || s.name || '').toLowerCase();
        const desc = (s.description || s.short_description || '').toLowerCase();
        return title.includes(cleanQuery) || desc.includes(cleanQuery);
      })
      .slice(0, 6)
      .map((s) => ({
        id: s.id,
        title: s.title || s.name,
        description: s.description || s.short_description,
        image: s.image || s.icon,
        link: `/services`,
        type: 'service',
      }));
  }

  // 3. Filter Blogs
  if (blogsRes.status === 'fulfilled' && blogsRes.value) {
    const blogsData = Array.isArray(blogsRes.value) ? blogsRes.value : blogsRes.value?.data || [];
    results.blogs = blogsData
      .filter((b) => {
        const title = (b.title || '').toLowerCase();
        const desc = (b.short_description || b.content || '').toLowerCase();
        const category = (b.category || '').toLowerCase();
        return title.includes(cleanQuery) || desc.includes(cleanQuery) || category.includes(cleanQuery);
      })
      .slice(0, 6)
      .map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        category: b.category || 'مقال',
        date: b.date || b.created_at,
        image: b.image || '/about-engineers.jpg',
        link: b.slug ? `/blogs/${b.slug}` : '/blogs',
        type: 'blog',
      }));
  }

  // 4. Filter Static Pages
  results.pages = STATIC_PAGES.filter((pg) => {
    return pg.title.toLowerCase().includes(cleanQuery) || pg.description.toLowerCase().includes(cleanQuery);
  });

  return results;
};

/**
 * Normalizer for raw backend API results format
 */
function normalizeApiSearchResults(data, query) {
  if (Array.isArray(data)) {
    return {
      projects: data.filter(item => item.type === 'project' || item.type === 'projects'),
      services: data.filter(item => item.type === 'service' || item.type === 'services'),
      blogs: data.filter(item => item.type === 'blog' || item.type === 'blogs'),
      pages: STATIC_PAGES.filter(pg => pg.title.toLowerCase().includes(query) || pg.description.toLowerCase().includes(query)),
    };
  }

  return {
    projects: data.projects || [],
    services: data.services || [],
    blogs: data.blogs || [],
    pages: data.pages || STATIC_PAGES.filter(pg => pg.title.toLowerCase().includes(query)),
  };
}

export default searchGlobal;
