import type { V2_MetaFunction } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
    return [{ title: 'Remix Upload files' }, { name: 'author', content: 'Mateo Santos' }];
};

export default function Index() {
    const fetcher = useFetcher();
    const { state, data } = fetcher;

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
            <fetcher.Form
                action="/api/upload"
                method="post"
                encType="multipart/form-data"
            >
                <input type="file" name="photo" accept="image/*" />
                <button type="submit" disabled={state === 'submitting'}>
                    Upload
                </button>
                {data && (
                    <div>
                        <pre>{`Uploaded file name: ${data.image}`}</pre>
                    </div>
                )}
            </fetcher.Form>
        </div>
    );
}
