import { FastifyReply, FastifyRequest } from "fastify";

const videoController = {
    uploadVideo: async (_req: FastifyRequest, res: FastifyReply) => {
        // if (!req.file?.mimetype.includes("video"))
        //     return res.status(400).json("Invalid file type");

        // cloudinary.v2.uploader.upload(
        //     req.file.path,
        //     {
        //         resource_type: "video",
        //         upload_preset: "ourtube-video"
        //     },
        //     (err, result) => {
        //         if (err) return res.status(500).json(err.message);
        //         return res.status(200).json(result);
        //     }
        // );

        // return;
        return res.send({ msg: "TODO" });
    }
};

export default videoController;
