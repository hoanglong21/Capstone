import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function TextEditor() {
    const editorConfiguration = {
        toolbar: {
            items: [
                'bold',
                'italic',
                'underline',
                '|',
                'fontColor',
                'fontBackgroundColor',
                'highlight',
                '|',
                'undo',
                'redo',
            ],
        },
        language: 'en',
    }

    return (
        <CKEditor
            editor={Editor}
            config={editorConfiguration}
            onChange={(even, editor) => {
                const data = editor.getData()
                console.log(data)
            }}
        />
    )
}
