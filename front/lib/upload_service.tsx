import sanitize from "sanitize-filename";
//import axios from "axios";
export class UploadService {
  constructor() {}
  static sanitizeName = (filename: string) => {
    const result = filename.replace(/\(.*?\)/g, "");
    return sanitize(result);
  };

  static handleUpload = async (file: File) => {
    if (file) {
      const filename = this.sanitizeName(file.name);
      const formData = new FormData();

      formData.append("file", file);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL}/api/uploadfile/index.php?name=${filename}`,
          {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erreur lors du téléchargement:", errorData);
          return;
        }

        const result = await response.json();

        return result.success;
      } catch (error) {
        console.error("Erreur lors du téléchargement:", error);
      }
    }
  };

  static handleUploadImg = async (file: File) => {
    if (file) {
      const filename = this.sanitizeName(file.name);
      const formData = new FormData();

      formData.append("file", file);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL}/api/uploadfile/index.php?name=${filename}`,
          {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erreur lors du téléchargement:", errorData);
          return;
        }

        const result = await response.json();
        return result.success;
      } catch (error) {
        console.error("Erreur lors du téléchargement:", error);
      }
    }
  };
  static deleteUpload = async (file: File, token: string | null) => {
    await fetch(
      process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
        "/api/uploadfile/index.php?name=" +
        file +
        "&token=" +
        token,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
  };
  static checkImageExists = async (imageUrl: string) => {
    const controller = new AbortController();
    const signal = controller.signal;
    return await fetch(
      process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
        "/api/uploadfile/index.php?name=" +
        imageUrl,
      {
        method: "GET",
        signal,
      }
    )
      .then(() => {})
      .catch((error) => {
        // Catching specific abort errors
        if (error.name === "AbortError") {
          return false;
        } else {
          return false;
        }
      });
  };
}
