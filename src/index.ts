import args from "args";
import s3FileUpload from "@services/s3-file-upload";

args.command("file-upload", "Upload file", s3FileUpload);
args.parse(process.argv);

if (process.argv.length <= 2) {
  throw new Error("You need to spesifcy a command. See README for available.");
}
