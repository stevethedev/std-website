import { main } from './index';

it('runs the tests', () => {
    const c = jest.spyOn(console, 'log');
    main();
    expect(c).toHaveBeenCalled();
});
