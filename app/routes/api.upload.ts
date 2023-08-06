import {
    type ActionArgs,
    type UploadHandler,
    unstable_parseMultipartFormData as parseMultipartFormData,
    unstable_createFileUploadHandler as createFileUploadHandler,
    unstable_composeUploadHandlers as composeUploadHandlers,
    json
} from '@remix-run/node';

type LocalUploadedFile = {
    filepath: string;
    type: string;
    name: string;
};

const standardFileUploadHandler: UploadHandler = createFileUploadHandler({
    directory: 'uploads'
});

const uploads: string[] = [];
const uploadHandler = composeUploadHandlers(
    async ({ name, contentType, data, filename }) => {

        if (name !== 'photo') {
            return undefined;
        }

        const fileUploaded = await standardFileUploadHandler({
            name,
            contentType,
            data,
            filename
        });

        const upload = fileUploaded as unknown as LocalUploadedFile;

        uploads.push(upload.name);
    }
);

export async function action({ request }: ActionArgs) {
    await parseMultipartFormData(request, uploadHandler);
    return json({ images: uploads });
}
