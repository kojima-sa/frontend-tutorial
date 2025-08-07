import  Sidebar  from "../../Sidebar";
import { render, screen, fireEvent, waitFor } from '@testing-library/react'


jest.mock('../handlers', () => ({
    handleCreateContent: jest.fn(),
    handleDeleteContent: jest.fn(),
}))

import { handleCreateContent, handleDeleteContent } from '../handlers'

jest.mock('../../../lib/api', () => ({
    fetchContents: jest.fn(() =>
        Promise.resolve([
        { id: 1, title: 'タイトル1', body: 'あめんぼ あかいな あいうえお 1' },
        { id: 2, title: 'タイトル2', body: 'うきもに こえびも およいでる 2' },
        ])
    ),
}))

const setSelectedId = jest.fn()
const setTitleEditMode = jest.fn()
const setBodyEditMode = jest.fn()
const setRefreshSidebar = jest.fn()

const renderSidebar = () => {
    render(
        <Sidebar
        selectedId={1}
        setSelectedId={setSelectedId}
        setTitleEditMode={setTitleEditMode}
        setBodyEditMode={setBodyEditMode}
        refreshSidebar={false}
        setRefreshSidebar={setRefreshSidebar}
        />
    )
}

test('Edit ボタンを押すと編集モードに切り替わる', () => {
    renderSidebar()
    const editButton = screen.getByRole('button', { name: 'Edit' })
    fireEvent.click(editButton)
    expect(screen.getByRole('button', { name: 'New page' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument()
})

test('New page ボタンを押すと handleCreateContent が呼ばれる', () => {
    renderSidebar()
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
    fireEvent.click(screen.getByRole('button', { name: 'New page' }))
    expect(handleCreateContent).toHaveBeenCalled()
    expect(setTitleEditMode).toHaveBeenCalledWith(true)
    expect(setBodyEditMode).toHaveBeenCalledWith(true)
})

test('Done ボタンを押すと編集モードが終了する', () => {
    renderSidebar()
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
    const doneButton = screen.getByRole('button', { name: 'Done' })
    fireEvent.click(doneButton)
    // Done を押したらボタンが消える = 編集モード終了
    expect(screen.queryByRole('button', { name: 'New page' })).not.toBeInTheDocument()
})

test('削除ボタンで handleDeleteContent が呼ばれる', async () => {
    renderSidebar()
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
    const deleteButton = await screen.findAllByTestId('delete-button')
    fireEvent.click(deleteButton[1])
    expect(handleDeleteContent).toHaveBeenCalledWith(
        2, // 削除対象ID
        1, // 現在選択中のID（selectedId）
        expect.any(Function),
        setSelectedId
    )
})


test('タイトルクリックで setSelectedId が呼ばれる', async () => {
    renderSidebar()
    await waitFor(() => {
        expect(screen.getByTestId('title-2')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByTestId('title-2'))
    expect(setSelectedId).toHaveBeenCalledWith(2)
})