import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MainContent from "../../MainContent"

jest.mock('../handlers', () => ({
    handleTitleEdit: jest.fn(),
    handleBodyEdit: jest.fn(),
}))
import { handleTitleEdit, handleBodyEdit } from '../handlers'

jest.mock('../../../lib/api', () => ({
    fetchContent: jest.fn(() =>
        Promise.resolve({
        id: 1,
        title: 'タイトル1',
        body: 'あめんぼ あかいな あいうえお 1',
        })
    ),
}))

const setSelectedId = jest.fn()
const setTitleEditMode = jest.fn()
const setBodyEditMode = jest.fn()
const setRefreshSidebar = jest.fn()

const renderMainContent = (overrideProps = {}) => {
    const defaultProps = {
        selectedId: 1,
        titleEditMode: false,
        setTitleEditMode: jest.fn(),
        bodyEditMode: false,
        setBodyEditMode: jest.fn(),
        setRefreshSidebar: jest.fn(),
    }
    render(<MainContent {...defaultProps} {...overrideProps} />)
}


test ('selectedId が null のときにメッセージが表示される', () => {
    renderMainContent({ selectedId: null })
    expect(screen.getByText('項目を選択してください')).toBeInTheDocument()
})

test('selectedId で指定した ID のタイトルと本文が表示される', async () => {
    renderMainContent()
    await waitFor(() => {
        expect(screen.getByTestId('title-1')).toBeInTheDocument()
    })
    expect(screen.getByTestId('body-1')).toHaveTextContent('あめんぼ あかいな あいうえお 1')
})

test (`title-edit を クリックするとタイトル編集モードになり、タイトル入力欄が出る`, async () => {
    renderMainContent({ setTitleEditMode: true })
    const editButton = await screen.findByTestId('title-editButton')
    fireEvent.click(editButton)
    expect(setTitleEditMode).toHaveBeenCalledWith(true)
})

test (``, () => {})
