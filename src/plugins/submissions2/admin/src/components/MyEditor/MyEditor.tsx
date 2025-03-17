import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function MyEditor({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (description: string) => void;
}) {
  const editorRef = useRef(null);
  const log = () => {
    const editor = editorRef.current;
    if (editor) {
      //   console.log(editor.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="n15ae8d2re2q2wq4zlssiym24dwkwil12srmdq7c3e4nr073"
        onInit={(_evt: any, editor: any) => (editorRef.current = editor)}
        initialValue={description}
        // onEditorChange={(editorContent) => {
        //   onchange({ target: { name: 'description', value: editorContent } });
        // }}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
