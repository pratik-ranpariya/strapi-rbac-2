"use client"
import { Editor } from '@tinymce/tinymce-react';

const MyEditor = () => {
const handleEditorChange = (content: string) => {
    console.log('Content:', content);
};


return (
    <Editor
        apiKey="n15ae8d2re2q2wq4zlssiym24dwkwil12srmdq7c3e4nr073"
        initialValue="<p>Type here...</p>"
        init={{
            height: 400,
            menubar: false,
            plugins: 'lists link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        }}
        onEditorChange={handleEditorChange}
        // onInit={(evt, editor: any)=> editorRef.current = editor}
        //       initialValue='<p>Hello, world!</p>'
        //       init={{
        //         menubar: false
        //       }}
        //         // apiKey="n15ae8d2re2q2wq4zlssiym24dwkwil12srmdq7c3e4nr073"
        //         // initialValue={description}
        //         // onEditorChange={handleEditorChange}
        //         // init={{
        //         //   height: 500,
        //         //   menubar: false,
        //         //   plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount',
        //         //   ],
        //         //   toolbar: [
        //         //     'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify',
        //         //     'bullist numlist outdent indent | link image media | removeformat help',
        //         //   ],
        //         // }}
        //         // value={editorContent}
    />
);
};

export default MyEditor;