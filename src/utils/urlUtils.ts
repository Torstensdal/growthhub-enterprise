// URL and link utilities for GrowthHub Enterprise

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const ensureHttps = (url: string): string => {
  if (!url) return '';
  
  // Already has protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Add https
  return `https://${url}`;
};

export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(ensureHttps(url));
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
};

export const getUrlParams = (url: string): Record<string, string> => {
  try {
    const urlObj = new URL(url);
    const params: Record<string, string> = {};
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  } catch {
    return {};
  }
};

export const addUrlParams = (url: string, params: Record<string, string>): string => {
  try {
    const urlObj = new URL(ensureHttps(url));
    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value);
    });
    return urlObj.toString();
  } catch {
    return url;
  }
};

export const removeUrlParams = (url: string, paramsToRemove: string[]): string => {
  try {
    const urlObj = new URL(url);
    paramsToRemove.forEach(param => {
      urlObj.searchParams.delete(param);
    });
    return urlObj.toString();
  } catch {
    return url;
  }
};

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const extractEmails = (text: string): string[] => {
  const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
  return text.match(emailRegex) || [];
};

export const extractUrls = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

export const isLinkedInUrl = (url: string): boolean => {
  return url.includes('linkedin.com');
};

export const isTwitterUrl = (url: string): boolean => {
  return url.includes('twitter.com') || url.includes('x.com');
};

export const isFacebookUrl = (url: string): boolean => {
  return url.includes('facebook.com');
};

export const isInstagramUrl = (url: string): boolean => {
  return url.includes('instagram.com');
};

export const getSocialPlatform = (url: string): string | null => {
  if (isLinkedInUrl(url)) return 'linkedin';
  if (isTwitterUrl(url)) return 'twitter';
  if (isFacebookUrl(url)) return 'facebook';
  if (isInstagramUrl(url)) return 'instagram';
  return null;
};

export const buildLinkedInProfileUrl = (username: string): string => {
  const clean = username.replace('@', '').replace('linkedin.com/in/', '');
  return `https://www.linkedin.com/in/${clean}`;
};

export const buildTwitterProfileUrl = (username: string): string => {
  const clean = username.replace('@', '');
  return `https://twitter.com/${clean}`;
};

export const createShareUrl = (platform: 'linkedin' | 'twitter' | 'facebook', text: string, url?: string): string => {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = url ? encodeURIComponent(url) : '';
  
  switch (platform) {
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedText}${url ? `&url=${encodedUrl}` : ''}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    default:
      return '';
  }
};

export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-z0-9._-]/gi, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
};

export const getFileExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

export const removeFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  return lastDotIndex > 0 ? filename.substring(0, lastDotIndex) : filename;
};

export const createDownloadUrl = (data: Blob, filename: string): string => {
  return URL.createObjectURL(data);
};

export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

export const openInNewTab = (url: string): void => {
  window.open(ensureHttps(url), '_blank', 'noopener,noreferrer');
};

export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[æ]/g, 'ae')
    .replace(/[ø]/g, 'oe')
    .replace(/[å]/g, 'aa')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const parseQueryString = (queryString: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const urlParams = new URLSearchParams(queryString);
  urlParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
};
