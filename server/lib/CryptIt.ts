import crypto from "crypto";

export default function CryptIt(value: string) {
    const result = crypto.createHash("SHA256").update(value).digest("hex");
    return result;
}