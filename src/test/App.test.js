import React from 'react';
import ReactDOM from 'react-dom';
import App from './../App';
import renderer from 'react-test-renderer';
describe("App component", () => {
    it('renders should match snapshot', () => {
        //const div = document.createElement('div');
        //ReactDOM.render(<App />, div);
        //ReactDOM.unmountComponentAtNode(div);
        const app = renderer.create(<App />);
        const component = app.toJSON();
        expect(component).toMatchSnapshot();
    });
});
