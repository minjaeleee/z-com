export async function getFollowingPosts() {
  const res = await fetch('http://localhost:9090/api/post/following', {
    next: {
      tags: ['posts', 'followings']
    },
    credentials: 'include',
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}