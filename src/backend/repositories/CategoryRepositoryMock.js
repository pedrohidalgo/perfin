// Let's do an in-memory implementation for now.
const _categories = [];

export class CategoryRepositoryMock {

  constructor() {
    // logger.debug('on CategoryRepositoryMock');
  }

  list() {
    return _categories;
  }

  save(category) {
    _categories.push(category);
  }

  // Marking all methods async makes them return promises!
  // async find(query) {
  //   const filtered = _todos.filter((todo) => {
  //     // Check the user ID
  //     if (todo.userId !== query.userId)
  //       return false;
  //     // Check the filter
  //     if (query.filter === 'COMPLETED')
  //       return todo.completed === true;
  //     if (query.filter === 'INCOMPLETED')
  //       return todo.completed === false;
  //     return true;
  //   });
  //
  //   return filtered
  // }
  //
  // async get(id) {
  //   const todo = _todos.find(x => x.id === id);
  //   return todo
  // }
  //
  // async create(data) {
  //   const newTodo = {
  //     id: Date.now(), // cheeky ID generation
  //     text: data.text,
  //     userId: data.userId,
  //     completed: data.completed
  //   }
  //   _todos.push(newTodo)
  //   return newTodo
  // }
  //
  // async update(id, data) {
  //   const todo = await this.get(id)
  //   Object.assign(todo, data)
  //   return todo
  // }
  //
  // async delete(id) {
  //   const todo = await this.get(id)
  //   _todos.splice(todo, 1)
  // }
}