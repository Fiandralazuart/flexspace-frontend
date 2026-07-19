import instance from "@/lib/axios/instance"
import endpoint from "./endpoint"

interface IFileUrl {
	fileUrl: string
}


const formDataHeader = {
   headers: {
      "Content-Type": "multipart/form-data"
   }
}

const uploadServices = {
	uploadFile: (payload: FormData) => instance.post(`${endpoint.MEDIA}/upload-single`, payload, formDataHeader),
	deleteFile: (payload: IFileUrl) => instance.delete(`${endpoint.MEDIA}/remove`, {data: payload}),
}

export default uploadServices