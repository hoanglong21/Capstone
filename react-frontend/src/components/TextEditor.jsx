import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function TextEditor(props) {
    const editorConfiguration = {
        toolbar: {
            items: [
                'textPartLanguage',
                '|',
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
        language: {
            textPartLanguage: [
                { title: 'English', languageCode: 'en' },
                { title: 'Vietnamese', languageCode: 'vi' },
                { title: 'Japanese', languageCode: 'ja' },
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
