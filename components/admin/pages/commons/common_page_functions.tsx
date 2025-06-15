export const getSlug = async (slug: string) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
        "/api/slug.php?slug=" +
        slug,
      {
        referrerPolicy: "strict-origin-when-cross-origin", // n
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    try {
      const page = await response.json();
      return page.id;
    } catch {}
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
};
