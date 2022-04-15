export class BlobImage {
  constructor(
    public url: string,
    public data: Blob,
    public mimeType?: string,
    public tag?: string,
    public width?: string,
    public height?: string
  ) {}
}
export class Base64Image {
  constructor(
    public url: string,
    public data: string,
    public mimeType?: string,
    public tag?: string,
    public width?: string,
    public height?: string
  ) {}
}
