"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { useApi } from '@/hooks/useAPI';

const PostDetails = () => {
  const { API } = useApi();
  const [post, setPost] = useState<any>(null);
  const searchParams = useSearchParams()
 
  const id = searchParams.get('id') 


  useEffect(() => {
    if (id) {
      getPostData();
    }
  }, [id]);

  const getPostData = async () => {
    const { success, error, data } = await API.get(`posts/fetch-by-id?id=${id}`);
    if (success) {
      setPost(data);
    } else {
      console.log(error);
    }
  };

  if (!post) {
    return <div>Loading...</div>; // Show a loading message until data is fetched
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      <div>
        {post.media_url && post.media_url.length > 0 && (
          <div>
            {post.media_url.map((url: string, index: number) => (
              <img key={index} src={url} alt={`Image ${index + 1}`} width={300} height={300} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
