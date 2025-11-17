const MAIN_CONTENT_REGEX = /<main[^>]*>([\s\S]*?)<\/main>/i;
const SCRIPT_TAG_REGEX = /<script[\s\S]*?<\/script>/gi;
const ASSET_SRC_REGEX = /src="(?:\.\.\/)+assets\//gi;
const ASSET_URL_REGEX = /url\(['"]?(?:\.\.\/)+assets\//gi;
const LEADING_PAGES_REGEX = /^\/?pages\//;
const LEADING_DOTS_REGEX = /^(\.\.\/)+/;

const sanitiseHash = (hash) => (hash ? `#${hash}` : '');

const mapLegacyHref = (legacyHref) => {
  if (!legacyHref || legacyHref.startsWith('http') || legacyHref.startsWith('mailto:') || legacyHref.startsWith('tel:')) {
    return legacyHref;
  }

  if (legacyHref === '#' || legacyHref.startsWith('#')) {
    return legacyHref;
  }

  const [rawPath, rawHash] = legacyHref.split('#');

  let path = rawPath.replace(LEADING_DOTS_REGEX, '');
  path = path.replace(LEADING_PAGES_REGEX, '');

  if (path === '' || path === 'index.html') {
    return `/${rawHash ? sanitiseHash(rawHash) : ''}`;
  }

  if (path.endsWith('.html')) {
    path = path.slice(0, -5);
  }

  return `/${path}${sanitiseHash(rawHash)}`;
};

export const extractMainContent = (html) => {
  const match = MAIN_CONTENT_REGEX.exec(html);
  if (!match) {
    return html;
  }
  return match[1];
};

export const stripScripts = (html) => html.replace(SCRIPT_TAG_REGEX, '');

export const normaliseAssetPaths = (html) =>
  html
    .replace(ASSET_SRC_REGEX, 'src="/assets/')
    .replace(ASSET_URL_REGEX, 'url(/assets/')
    .replace(/href="\/assets\//gi, 'href="/assets/')
    .replace(/poster="(?:\.\.\/)+assets\//gi, 'poster="/assets/');

export const rewriteLegacyLinks = (html) =>
  html.replace(/href="([^"]*\.html[^"]*)"/gi, (_, legacyHref) => `href="${mapLegacyHref(legacyHref)}"`).replace(
    /href="\/pages\//gi,
    'href="/',
  );

export const transformLegacyHtml = (html) => {
  let output = html;
  output = extractMainContent(output);
  output = stripScripts(output);
  output = normaliseAssetPaths(output);
  output = rewriteLegacyLinks(output);
  return output.trim();
};

export default transformLegacyHtml;

