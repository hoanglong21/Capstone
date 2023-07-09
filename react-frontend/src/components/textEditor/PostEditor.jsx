import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function PostEditor(props) {
    const editorConfiguration = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'heading',
                '|',
                'fontSize',
                'fontFamily',
                'fontColor',
                'fontBackgroundColor',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'subscript',
                'superscript',
                '|',
                'alignment',
                'bulletedList',
                'numberedList',
                'outdent',
                'indent',
                '|',
                'highlight',
                'blockQuote',
                'specialCharacters',
                'horizontalLine',
                '|',
                'link',
                'insertImage',
                'mediaEmbed',
                'insertTable',
            ],
        },
        removePlugins: ['MediaEmbedToolbar'],
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
