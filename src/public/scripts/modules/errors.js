class AbstractObjectInstantiationError extends Error {
    constructor(message) {
        if (!message) {
            super("Cannot create instances of Abstract classes")
        } else {
            super(message);
        }

        this.name = 'AbstractObjectInstantiationError';
    }
}

class UnimplementedAbstractMethodError extends Error {
    constructor(message) {
        if (!message) {
            super("Abstract method has not been implemented")
        } else {
            super(message);
        }

        this.name = 'UnimplementedAbstractMethodError';
    }
}

export { AbstractObjectInstantiationError, UnimplementedAbstractMethodError };