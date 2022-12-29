const CLOUD_TODOS = "TODos";

export default {
  get() {
    return JSON.parse(localStorage.getItem(CLOUD_TODOS)) || [];
  },
  set(toDos) {
    localStorage.setItem(CLOUD_TODOS, JSON.stringify(toDos));
  },
};
