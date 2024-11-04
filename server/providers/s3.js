import aws from 'aws-sdk';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const s3 = new aws.S3({
    region: "ca-central-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const generateUrl = async () => {
    const rawBytes = await crypto.randomBytes(16);
    const imageName = rawBytes.toString('hex') + '.pdf';

    const params = {
        Bucket: "dportfolio-my-uploads",
        Key: imageName,
        Expires: 60,
        ContentType: 'application/pdf'
    };

    const url = await s3.getSignedUrlPromise('putObject', params);
    return url;
};

export async function uploadFile(file) {

    const params = {
        Bucket: "dportfolio-my-uploads",
        Key: imageName,
        Body: file.data,
        Expires: 60,
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
}

export const getLatestResume = async () => {
    const params = {
        Bucket: 'dportfolio-my-uploads',
        MaxKeys: 50
    };

    const data = await s3.listObjectsV2(params).promise();
    const files = data.Contents.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));
    return files.length > 0 ? `https://${params.Bucket}.s3.amazonaws.com/${files[0].Key}` : null;
};


export default { generateUrl };
