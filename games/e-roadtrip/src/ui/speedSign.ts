/** German/French speed-limit disc, or the end-of-restriction sign when the section is unrestricted. */
export function speedSignHtml(limitKmh: number): string {
  if (limitKmh <= 0) {
    const title = 'Unbeschränkt';
    return `<span class="speed-sign end" title="${title}" aria-label="${title}"></span>`;
  }
  const title = `Tempolimit ${limitKmh} km/h`;
  return `<span class="speed-sign" title="${title}" aria-label="${title}">${limitKmh}</span>`;
}
