export default async function fetchSlugs() {
  const response = await fetch(
    `${process.env.NEXT_PRIVATE_URL}/api/posts/?fields[0]=slug`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }
  );
  const result = await response.json();
  return result.data.map((post) => ({
    slug: post.attributes.slug,
  }));
}
