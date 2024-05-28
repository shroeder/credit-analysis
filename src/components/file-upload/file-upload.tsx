import { useState } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePondFile } from 'filepond';
import { readString } from 'react-papaparse';
import useImportData from '../../hooks/useImportData';
import StyledFileUpload from './file-upload.style';

const FileUpload = () => {
    const [files, setFiles] = useState<FilePondFile[]>([]);
    const { importData } = useImportData();

    return (
        <StyledFileUpload>
            <FilePond
                files={files as any}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={3}
                name="files"
                credits={false}
                server={{
                    process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                        file.text().then((d) => [
                            readString(d, {
                                skipEmptyLines: true,
                                complete: (results) => {
                                    if (results?.data?.length) {
                                        const data = (results?.data as string[][]).filter((row) => {
                                            return row.filter((column) => !column?.length).length !== row.length;
                                        })
                                        importData(data)
                                        load("jimmy dean sausage")
                                    } else {
                                        error("Errpro parsing import file")
                                    }
                                }
                            })
                        ])
                    }
                }}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </StyledFileUpload>
    )
}

export default FileUpload