class ModelValidationException extends Error {
  constructor(message) {
    super(message);

    this.name = 'ModelValidationException';
  }

  toString() {
    const json = {
      name: this.name,
      message: this.message,
    };

    return JSON.stringify(json);
  }
}

export default ModelValidationException;