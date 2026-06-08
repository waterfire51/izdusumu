const OWNER = process.env.GITHUB_REPO_OWNER ?? "waterfire51";
const REPO = process.env.GITHUB_REPO_NAME ?? "izdusumu_assets";

function getRawUrl(path: string) {
  return `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/${path}`;
}

export async function uploadToGitHub(
  file: Buffer,
  filename: string,
  folder = "uploads"
) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN tanımlı değil");

  const path = `${folder}/${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const content = file.toString("base64");

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload ${filename}`,
        content,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub yükleme hatası: ${err}`);
  }

  return getRawUrl(path);
}

export async function deleteFromGitHub(path: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return;

  const getRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!getRes.ok) return;

  const data = (await getRes.json()) as { sha: string };

  await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Delete ${path}`,
        sha: data.sha,
      }),
    }
  );
}
