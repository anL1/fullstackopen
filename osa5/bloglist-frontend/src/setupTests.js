import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

jest.mock('./services/blogs')

let savedItems = {}

const localStorageMock = {
    setItem: (key, item) => {
        savedItems[key] = item
    },
    getItem: (key) => savedItems[key],
    clear: savedItems = {}
}

window.localStorage = localStorageMock

configure({ adapter: new Adapter() })