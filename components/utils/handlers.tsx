import { createContent, deleteContent, titleUpdate, bodyUpdate } from "@/lib/api"
import type { Content } from "@/lib/types"

// 新規作成
export const handleCreateContent = async (
    setSelectedId: (id: number) => void,
    setContents: React.Dispatch<React.SetStateAction<Content[]>>
    ) => {
        const newContent = await createContent({
            title: "新規メモ",
            body: "本文を入力してください",
    });
    setSelectedId(newContent.id);
    setContents(prev => [...prev, newContent]);
};

// 削除処理
export const handleDeleteContent = async (
    id: number,
    selectedId: number | null,
    setContents: React.Dispatch<React.SetStateAction<Content[]>>,
    setSelectedId: (id: number | null) => void
    ) => {
        const confirmDelete = window.confirm("本当に削除しますか？");
        if (!confirmDelete) return;
        if (id === null) return;

        await deleteContent(id);

        setContents(prev => prev.filter(item => item.id !== id));
        if (selectedId === id) {
            setSelectedId(null);
    }
};

//タイトル編集
export const handleTitleEdit = async (
    selectedId: number,
    titleInput: string,
    bodyInput: string,
    setTitleEditMode: (value: boolean) => void,
    setContent: React.Dispatch<React.SetStateAction<Content | null>>,
    setRefreshSidebar: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const trimmedTitle = titleInput.trim();

    if (trimmedTitle.length === 0) {
        alert("空白のタイトルは無効です");
        return;
    }
    if (trimmedTitle.length > 50) {
        alert("タイトルは50文字以下で入力してください");
        return;
    }

    try {
        await titleUpdate(selectedId, { title: titleInput });
        setTitleEditMode(false);
        setContent((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                title: titleInput,
                body: bodyInput,
            };
        });
        console.log("タイトル更新");
        setRefreshSidebar(prev => !prev);
    } catch (error) {
        console.error("タイトルの更新に失敗しました", error);
    }
};

//本文編集
export const handleBodyEdit = async (
    selectedId: number,
    titleInput: string,
    bodyInput: string,
    setBodyEditMode: (value: boolean) => void,
    setContent: React.Dispatch<React.SetStateAction<Content | null>>,
    ) => {
    const trimmedBody = bodyInput.trim();

    if (trimmedBody.length < 10) {
        alert("本文は10文字以上で記入してください");
        return;
    }
    if (trimmedBody.length > 2000) {
        alert("本文はは2000文字以下で入力してください");
        return;
    }

    try {
        await bodyUpdate(selectedId, { body: bodyInput });
        setBodyEditMode(false);
        setContent((prev) => {
        if (!prev) return prev;
        return {
            ...prev,
            title: titleInput,
            body: bodyInput,
        };
        });
        console.log("本文更新");
    } catch (error) {
        console.error("本文の更新に失敗しました", error);
    }
};