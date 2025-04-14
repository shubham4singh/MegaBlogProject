// RTE = real time editor

import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}

                /* yeh control parent element (jo call krega RTE function ko) dega. */
                /* control object is from invoking useForm. */
                control={control}

                /* connects tinyMCE changes with react hook form */
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='fjjpepikj298o66i5zk7ghcqqdu3ubx0umfy7u32j0oxsh4h'
                        initialValue={defaultValue}
                        init={{
                            skin: "oxide-dark",
                            content_css: "dark",
                            branding: false, /* tinymce ki branding removed */
                            height: 500,
                            menubar: true,
                            plugins: ["image", "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount", "anchor",],
                            toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange} // pipes TinyMCE's changes into React Hook Form's state management
                    />
                )}
            />
        </div>
    )
}

/*
<Editor/> is TinyMCE React Component

// name -- The key used to store this field's value
// The control object is created by useForm() and serves as the "bridge" between React Hook Form and your controlled components (like the TinyMCE Editor). It:
Manages form state,Handles validation, Connects components to the form's data flow.

// onChange is triggered whenever the value of the form field changes. It’s part of the field object provided by React Hook Form's Controller component. It helps you bind the value of your form input to your state or form control.

// onEditorChange is triggered when content changes. It provides the updated content (content) and the editor instance (editor).
*/