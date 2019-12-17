export function toggleMenu(show) {
  return {
    type: '@user/TOGGLE_MENU',
    payload: { show },
  };
}
