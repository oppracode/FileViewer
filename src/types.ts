interface ToolbarButtonContent {
  name: string;
  icon: string;
}

interface DropboxState {
  files: DropboxFile[]; // Replace 'any[]' with the actual type for your files
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Fields that are nullable are available only for FileType.file
interface DropboxFile {
  id: string;
  type: FileType;
  name: string;
  isDownloadable: boolean;
  size: number | null;
  serverModified: string | null;
  clientModified: string | null;
}

interface DropboxFileRaw {
  id: string;
  '.tag': string;
  name: string;
  is_downloadable: boolean | undefined;
  size: number | undefined;
  server_modified: string | undefined;
  client_modified: string | undefined;
}

interface FetchFilesResponse {
  entries: DropboxFileRaw[];
  hasMore: boolean;
  cursor: string;
}

enum FileType {
  FOLDER,
  FILE,
}

export {
  DropboxState,
  DropboxFile,
  DropboxFileRaw,
  FetchFilesResponse,
  FileType,
  ToolbarButtonContent,
};
