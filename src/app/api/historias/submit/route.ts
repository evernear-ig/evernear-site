import { NextResponse } from "next/server";
import { submitStory } from "@/lib/storage/store";
import type { StoryMediaType } from "@/lib/ecosystem/types";

const MAX_MEDIA_BYTES = 20 * 1024 * 1024;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  let name: string;
  let email: string;
  let story: string;
  let connectedWith: string;
  let achievement: string;
  let verticalSlug: string;
  let cityId: string;
  let mediaType: StoryMediaType = "photo";
  let mediaName: string | undefined;
  let mediaSize: number | undefined;

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    name = String(form.get("name") ?? "");
    email = String(form.get("email") ?? "");
    story = String(form.get("story") ?? "");
    connectedWith = String(form.get("connectedWith") ?? "");
    achievement = String(form.get("achievement") ?? "");
    verticalSlug = String(form.get("verticalSlug") ?? "descubrimiento");
    cityId = String(form.get("cityId") ?? "pi");
    mediaType = form.get("mediaType") === "video" ? "video" : "photo";

    const media = form.get("media");
    if (media instanceof File && media.size > 0) {
      if (media.size > MAX_MEDIA_BYTES) {
        return NextResponse.json({ ok: false, error: "file_too_large" }, { status: 400 });
      }
      const isVideo = media.type.startsWith("video/");
      const isImage = media.type.startsWith("image/");
      if (mediaType === "video" && !isVideo) {
        return NextResponse.json({ ok: false, error: "invalid_video" }, { status: 400 });
      }
      if (mediaType === "photo" && !isImage) {
        return NextResponse.json({ ok: false, error: "invalid_photo" }, { status: 400 });
      }
      mediaName = media.name;
      mediaSize = media.size;
    }
  } else {
    const body = await request.json();
    name = String(body.name ?? "");
    email = String(body.email ?? "");
    story = String(body.story ?? "");
    connectedWith = String(body.connectedWith ?? "");
    achievement = String(body.achievement ?? "");
    verticalSlug = String(body.verticalSlug ?? "descubrimiento");
    cityId = String(body.cityId ?? "pi");
    mediaType = body.mediaType === "video" ? "video" : "photo";
  }

  if (!name || !email || !story || !achievement) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  submitStory({
    name,
    email,
    story,
    connectedWith,
    achievement,
    verticalSlug,
    cityId,
    mediaType,
    mediaName,
    mediaSize,
  });

  return NextResponse.json({ ok: true });
}
