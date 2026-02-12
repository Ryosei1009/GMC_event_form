// import React, { useRef, useState } from 'react'
// import axios from 'axios';
// import FormV2 from './components/FormV2';
// import PreviewV2 from './components/PreviewV2';
// import ActionPerfect from '../utils/ActionPerfect';
// import ErrorModal from '../utils/ErrorModal';
import { Helmet } from 'react-helmet';

const NewItemV2 = () => {
    // const [formData, setFormData] = useState({
    //     citizenid: "",
    //     name: "",
    //     description: "",
    //     is_emote: 0,
    //     emote: "",
    //     is_image: 0,
    //     is_audio: 0,
    //     is_remove: 0,
    // });

    // const [files, setFiles] = useState({
    //     basic_image: null,
    //     display_image: null,
    //     audio_file: null
    // });

    // const [previewUrls, setPreviewUrls] = useState({
    //     basic_image: null,
    //     display_image: null,
    //     audio_file: null
    // });

    // const handleChange = (event) => {
    //     const { name, value, type, checked } = event.target;
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    //     }));
    // };

    // const handleFileChange = (fieldName, file) => {
    //     setFiles(prev => ({
    //         ...prev,
    //         [fieldName]: file
    //     }));

    //     if (file) {
    //         if (previewUrls[fieldName]) {
    //             URL.revokeObjectURL(previewUrls[fieldName]);
    //         }
    //         const newPreviewUrl = URL.createObjectURL(file);
    //         setPreviewUrls(prev => ({
    //             ...prev,
    //             [fieldName]: newPreviewUrl
    //         }));
    //     }
    // };

    // const uploadError = {
    //     citizenid: "CitizenIDを入力してください。",
    //     citizenid_length: "CitizenIDは8文字である必要があります。",
    //     name: "アイテム名を入力してください。",
    //     basic_image: "基本画像を選択してください。",
    //     display_image: "表示画像を選択してください。",
    //     audio_file: "音楽ファイルを選択してください。",
    //     emote: "エモート名を入力してください。",
    // };

    // const [displayError, setDisplayError] = useState(false);

    // const validateForm = () => {
    //     const errors = [];
    //     if (!formData.citizenid) errors.push("citizenid");
    //     if (formData.citizenid && formData.citizenid.length !== 8) errors.push("citizenid_length");
    //     if (!formData.name) errors.push("name");
    //     if (!files.basic_image) errors.push("basic_image");
    //     if (formData.is_image === 1 && !files.display_image) {
    //         errors.push("display_image");
    //     }
    //     if (formData.is_audio === 1 && !files.audio_file) {
    //         errors.push("audio_file");
    //     }
    //     if (formData.is_emote === 1 && !formData.emote) {
    //         errors.push("emote");
    //     }
    //     return errors;
    // };

    // const scrollToError = (errorField) => {
    //     const element = document.getElementById(errorField);
    //     if (element) {
    //         window.scrollTo({
    //             top: element.getBoundingClientRect().top + window.scrollY - 75,
    //             behavior: "smooth"
    //         });
    //     }
    // };

    // const handleUpload = async () => {
    //     setDisplayError(true);
    //     const errors = validateForm();
    //     if (errors.length > 0) {
    //         scrollToError(errors[0]);
    //         return;
    //     }

    //     const uploadFormData = new FormData();
    //     Object.keys(formData).forEach(key => {
    //         const value = formData[key];
    //         if (value !== null && value !== undefined && value !== "") {
    //             uploadFormData.append(key, value);
    //         }
    //     });

    //     if (files.basic_image) {
    //         uploadFormData.append('basic_image', files.basic_image);
    //     }
    //     if (files.display_image) {
    //         uploadFormData.append('display_image', files.display_image);
    //     }
    //     if (files.audio_file) {
    //         uploadFormData.append('audio_file', files.audio_file);
    //     }

    //     try {
    //         await axios.post(`${process.env.REACT_APP_API_DOMAIN}/event_item/upload`, uploadFormData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         setIsUploadPerfect(true);
    //         setIsUploadError(false);
    //         localStorage.setItem('citizenid', formData.citizenid);
    //     } catch (error) {
    //         console.error('Error uploading data:', error);

    //         let errorTitle = "申請エラー";
    //         let errorMessage = "アイテムの申請中にエラーが発生しました。";
    //         let errorDetails = "";

    //         if (error.response) {
    //             const status = error.response.status;
    //             const responseData = error.response.data;

    //             switch (status) {
    //                 case 400:
    //                     errorTitle = "入力エラー";
    //                     errorMessage = "入力内容に問題があります。";
    //                     errorDetails = typeof responseData === 'string' ? responseData : JSON.stringify(responseData);
    //                     break;
    //                 case 413:
    //                     errorTitle = "ファイルサイズエラー";
    //                     errorMessage = "アップロードファイルのサイズが大きすぎます。";
    //                     break;
    //                 case 500:
    //                     errorTitle = "サーバーエラー";
    //                     errorMessage = "サーバー内部でエラーが発生しました。";
    //                     break;
    //                 default:
    //                     errorDetails = `ステータスコード: ${status}`;
    //             }
    //         } else if (error.request) {
    //             errorTitle = "通信エラー";
    //             errorMessage = "サーバーとの通信に失敗しました。";
    //         } else {
    //             errorDetails = error.message;
    //         }

    //         setErrorModal({
    //             isOpen: true,
    //             title: errorTitle,
    //             message: errorMessage,
    //             details: errorDetails
    //         });
    //     }
    // };

    // const textareaRef = useRef(null);
    // const adjustTextareaHeight = () => {
    //     const textarea = textareaRef.current;
    //     if (textarea) {
    //         textarea.style.height = 'auto';
    //         textarea.style.height = textarea.scrollHeight + 'px';
    //     }
    // };

    // const [previewUrl, setPreviewUrl] = useState();
    // const [isUploadPerfect, setIsUploadPerfect] = useState(false);
    // const [isUploadError, setIsUploadError] = useState(false);

    // const [errorModal, setErrorModal] = useState({
    //     isOpen: false,
    //     title: '',
    //     message: '',
    //     details: ''
    // });

    return (
        <>
            <Helmet
                title="アイテム申請フォーム - GMC 2周年イベント"
                meta={[
                    { name: 'description', content: 'GMC 2周年イベント用のアイテム申請フォーム' },
                ]}
            />
            {/* <div className="min-h-screen"> */}
                {/* <div className="relative justify-center flex">
                    <div className="opacity-100 text-black absolute max-sm:top-12 top-28 text-center mx-4">
                        <span className="block text-4xl max-sm:text-3xl font-bold mb-1 mt-8">2周年イベント アイテム申請</span>
                    </div>
                    <img src="/images/bg.png" alt="" className="opacity-20 h-72 max-sm:h-48 w-full object-cover"></img>
                </div> */}
                <section className="flex justify-center items-center pt-20 pb-24 text-black">
                    <img className="w-1/4 mr-8" src="/images/logo.png" alt="" />
                    <div className="justify-start w-2/4">
                        <h1 className="text-4xl max-md:text-3xl max-sm:text-2xl font-bold">申請の受付は終了しました。</h1>
                        <p className="text-lg max-md:text-base max-sm:text-sm">GMC 2周年フリーマーケット 出店・商品申請は2/12(木) 4:00に締め切りました。</p>
                        <p className="text-lg max-md:text-base max-sm:text-sm">イベントへの参加お待ちしております。</p>
                    </div>
                </section>
                {/* <div className="mt-6">
                    <FormV2
                        formData={formData}
                        handleChange={handleChange}
                        handleFileChange={handleFileChange}
                        handleUpload={handleUpload}
                        displayError={displayError}
                        uploadError={uploadError}
                        setFormData={setFormData}
                        adjustTextareaHeight={adjustTextareaHeight}
                        textareaRef={textareaRef}
                        previewUrl={previewUrl}
                        setPreviewUrl={setPreviewUrl}
                        files={files}
                        previewUrls={previewUrls}
                    />
                </div>
                <PreviewV2 formData={formData} previewUrl={previewUrl} files={files} previewUrls={previewUrls} />
                <ActionPerfect
                    Perfect={isUploadPerfect}
                    onClose={() => {
                        window.location.reload()
                        setIsUploadPerfect(false)
                    }}
                    title={"Perfect"}
                    text={"アイテムの申請が完了しました。\n審査後、イベントに追加されます。"}
                />
                <ActionPerfect
                    Perfect={isUploadError}
                    onClose={() => { setIsUploadError(false) }}
                    title={"Error"}
                    text={"アイテムの申請に失敗しました。\n時間をおいて再度お試しください。"}
                />
                <ErrorModal
                    isOpen={errorModal.isOpen}
                    onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
                    title={errorModal.title}
                    message={errorModal.message}
                    details={errorModal.details}
                /> */}
            {/* </div> */}
        </>
    )
}

export default NewItemV2