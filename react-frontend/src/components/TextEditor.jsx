import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function TextEditor(props) {
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
    }

    return (
        <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data={props.data}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
    )
}
