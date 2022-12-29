// const init = {
//   phones: ["samsung"],
// };
// export default function reducer(state = init, action, args) {
//   switch (action) {
//     case "ADD":
//       const [newPhone] = args;
//       return {
//         ...state,
//         phones: [...state.phones, newPhone],
//       };
//       break;
//     default:
//       return state;
//   }
// }
import cloud from "./cloud.js";

const init = {
  toDos: cloud.get(),
  filter: "all",
  filters: {
    all: () => true,
    active: (todo) => !todo.completed,
    completed: (todo) => todo.completed,
  },
  editIndex: null,
};

const actions = {
  add({ toDos }, job) {
    job && toDos.push({ job, completed: false });
    cloud.set(toDos);
  },
  toggle({ toDos }, index) {
    const toDo = toDos[index];
    toDo.completed = !toDo.completed;
    cloud.set(toDos);
  },
  toggleALl({ toDos, completed }) {
    toDos.forEach((todo) => (todo.completed = completed));
    cloud.set(toDos);
  },
  destroy({ toDos }, index) {
    toDos.splice(index, 1);
    cloud.set(toDos);
  },
  filterChange(state, filter) {
    state.filter = filter;
  },
  deleteCompleted(state) {
    state.toDos = state.toDos.filter(state.filters.active);
    cloud.set(state.toDos);
  },
  edit(state, index) {
    state.editIndex = index;
  },
  doneEdit(state, job) {
    if (state.editIndex !== null) {
      if (job) {
        state.toDos[state.editIndex].job = job;
        cloud.set(state.toDos);
      } else {
        this.destroy(state, state.editIndex);
      }
      state.editIndex = null;
    }
  },
  diedEdit(state) {
    state.editIndex = null;
  },
};

export default function reducer(state = init, action, args) {
  actions[action] && actions[action](state, ...args);
  return state;
}
