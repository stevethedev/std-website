import {EventBus} from './event-bus';

it('can be constructed', () => {
    new EventBus();
});

it('emits string events without throwing errors', () => {
    const eb = new EventBus();
    eb.dispatch('no-event');
    eb.dispatch('param-event', 1);
});

it('emits symbol events without throwing errors', () => {
    const eb = new EventBus();
    eb.dispatch(Symbol('foo'));
    eb.dispatch(Symbol('bar'), 1);
});

it('can apply a single string-identified listener', () => {
    const eb = new EventBus();
    const listener = jest.fn();

    eb.on('myevent', listener);
    eb.dispatch('myevent', 1, 2, 3);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(1, 2, 3);
});

it('can apply a single symbol-identified listener', () => {
    const eb = new EventBus();
    const listener = jest.fn();
    const event = Symbol('test event');

    eb.on(event, listener);
    eb.dispatch(event, 1, 2, 3);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(1, 2, 3);
})

it('does not call listeners on the wrong event', () => {
    const eb = new EventBus();
    const listener = jest.fn();

    eb.on(Symbol('foo'), listener);
    eb.dispatch(Symbol('foo'), 1, 2, 3);

    expect(listener).not.toHaveBeenCalled();
});

it('registers the same event listener multiple times', () => {
    const eb = new EventBus();
    const listener = jest.fn();

    eb.on('foo', listener);
    eb.on('foo', listener);
    eb.on('foo', listener);

    eb.dispatch('foo');

    expect(listener).toHaveBeenCalledTimes(3);
})

it('removes listeners with the returned handle', () => {
    const eb = new EventBus();
    const listeners = [jest.fn(), jest.fn()];

    const {remove} = eb.on('foo', listeners[0]);
    eb.on('foo', listeners[1]);

    remove();

    eb.dispatch('foo');

    expect(listeners[0]).not.toHaveBeenCalled();
    expect(listeners[1]).toHaveBeenCalledTimes(1)
});

it('can register multiple events', () => {
    const eb = new EventBus();
    const listeners = [jest.fn(), jest.fn()];

    eb.on('foo', listeners[0]);
    eb.on('bar', listeners[1]);

    eb.dispatch('foo');

    expect(listeners[0]).toHaveBeenCalled();
    expect(listeners[1]).not.toHaveBeenCalled();
})
