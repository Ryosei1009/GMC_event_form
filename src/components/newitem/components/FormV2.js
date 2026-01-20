import React from 'react'
import ImageV2 from './ImageV2';
import TabV2 from './TabV2';
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Dialog, DialogPanel, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react';

const FormV2 = ({
    handleChange,
    formData,
    handleFileChange,
    displayError,
    uploadError,
    setFormData,
    handleUpload,
    previewUrl,
    setPreviewUrl,
    files,
    previewUrls,
}) => {
    const [showModal, setShowModal] = useState(false);

    const onClose = () => {
        setShowModal(false);
    }

    // 画像表示アップロードハンドラー
    const handleDisplayImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.includes('png')) {
                alert('PNG形式の画像を選択してください。');
                event.target.value = '';
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                alert('ファイルサイズが大きすぎます。10MB以下の画像を選択してください。');
                event.target.value = '';
                return;
            }
            handleFileChange('display_image', file);
        }
    };

    // 音楽ファイルアップロードハンドラー
    const handleAudioChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.includes('audio/mpeg')) {
                alert('MP3形式の音楽ファイルを選択してください。');
                event.target.value = '';
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                alert('ファイルサイズが大きすぎます。10MB以下のファイルを選択してください。');
                event.target.value = '';
                return;
            }
            handleFileChange('audio_file', file);
        }
    };

    return (
        <div className="flex justify-center mx-3">
            <div className="max-w-2xl w-full mb-16 space-y-8">
                {/* 注意点 */}
                <section className="bg-white px-6 pt-6 pb-3 rounded-xl shadow-lg border-red-500 border-4">
                    <h2 className="text-xl font-bold text-red-600 mb-2">注意点</h2>
                    <ul className="text-secondary-800 space-y-1 text-sm">
                        <li>・CitizenIDは必ず正確に入力してください。間違ったCitizenIDで申請された場合、アイテムが正しく配布されない可能性があります。</li>
                        <li>・エモート名は正確に入力してください。間違ったエモート名を入力すると、エモートが正しく再生されない可能性があります。</li>
                        <li>・質問や画像の作成においてサポートが必要な方はDiscord <span className="font-mono">@neko8625 @hina_1111_</span> へ連絡ください。</li>
                        <li>・オプションを使用すると追加料金が発生します。</li>
                        <div className="flex items-center justify-center py-4">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="border border-black px-4 py-2">オプション</th>
                                        <th className="border border-black px-4 py-2">事前納品料金</th>
                                        <th className="border border-black px-4 py-2">当日納品料金</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-black px-4 py-2">
                                            エモートアイテム<br />
                                            画像表示アイテム<br />
                                            音楽再生アイテム<br />
                                        </td>
                                        <td className="border border-black px-4 py-2">¥25,000</td>
                                        <td className="border border-black px-4 py-2">¥50,000</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black px-4 py-2">使用後にアイテムを削除しない</td>
                                        <td className="border border-black px-4 py-2">¥25,000</td>
                                        <td className="border border-black px-4 py-2">¥50,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </ul>
                </section>

                {/* CitizenID */}
                <div className="relative flex flex-col mt-8 bg-white px-6 pt-6 pb-3 rounded-xl shadow-lg">
                    <label className="text-lg font-bold text-secondary-800" htmlFor="citizenid">
                        CitizenID<span className="text-red-500"> *</span>
                    </label>
                    <div className="flex justify-between">
                        <div className="text-gray-600 text-sm mb-2">
                            あなたのCitizenID（8文字）を入力してください。<br />
                            キャラクター選択画面の右上に記載されています。
                        </div>
                        <div>
                            <span className="font-bold pb-2">CitizenID 記載場所</span>
                            <img className="w-48" src="/images/citizenid_example.png" alt="CitizenID example" />
                        </div>
                    </div>
                    <input
                        className="border-b-2 border-b-gray-200 focus:border-b-primary-500 focus:outline-none bg-transparent text-lg"
                        onChange={handleChange}
                        value={formData.citizenid}
                        type="text"
                        id="citizenid"
                        name="citizenid"
                        maxLength={8}
                        placeholder="ABC12345"
                        onInput={(event) => {
                            event.target.value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                        }}
                    />
                    <div className="flex justify-between text-gray-500 mt-1">
                        <div className="text-red-500 font-bold text-sm">
                            {displayError && !formData.citizenid && uploadError.citizenid}
                            {displayError && formData.citizenid && formData.citizenid.length !== 8 && uploadError.citizenid_length}
                        </div>
                        <div className="text-sm">{formData.citizenid.length}/8</div>
                    </div>
                </div>

                {/* アイテム名 */}
                <div className="relative flex flex-col mt-6 bg-white px-6 pt-6 pb-3 rounded-xl shadow-lg">
                    <label className="text-lg font-bold text-secondary-800" htmlFor="name">
                        アイテム名<span className="text-red-500"> *</span>
                    </label>
                    <div className="text-gray-600 text-sm mb-2">申請するアイテムの名前を入力してください。</div>
                    <input
                        className="border-b-2 border-b-gray-200 focus:border-b-primary-500 focus:outline-none bg-transparent text-lg"
                        onChange={handleChange}
                        value={formData.name}
                        type="text"
                        id="name"
                        name="name"
                        maxLength={30}
                        placeholder="思い出のオルゴール"
                    />
                    <div className="flex justify-between text-gray-500 mt-1">
                        <div className="text-red-500 font-bold text-sm">
                            {displayError && !formData.name && uploadError.name}
                        </div>
                        <div className="text-sm">{formData.name.length}/30</div>
                    </div>
                </div>

                {/* アイテム説明 */}
                <div className="relative flex flex-col mt-6 bg-white px-6 pt-6 pb-3 rounded-xl shadow-lg">
                    <label className="text-lg font-bold text-secondary-800" htmlFor="description">
                        アイテム説明
                    </label>
                    <div className="text-gray-600 text-sm mb-2">アイテムの説明文を入力してください（任意）</div>
                    <input
                        className="border-b-2 border-b-gray-200 focus:border-b-primary-500 focus:outline-none bg-transparent text-lg"
                        onChange={handleChange}
                        value={formData.description}
                        type="text"
                        id="description"
                        name="description"
                        maxLength={60}
                        placeholder="2周年を記念して作られた特別なアイテム"
                    />
                    <div className="flex justify-end text-gray-500 mt-1">
                        <div className="text-sm">{formData.description.length}/60</div>
                    </div>
                </div>

                {/* 基本画像アップロード */}
                <ImageV2
                    formData={formData}
                    setFormData={setFormData}
                    handleFileChange={handleFileChange}
                    displayError={displayError}
                    uploadError={uploadError}
                    previewUrl={previewUrl}
                    setPreviewUrl={setPreviewUrl}
                    files={files}
                />

                <TabV2
                    formData={formData}
                    setFormData={setFormData}
                />

                {/* エモート設定 - is_emote が 1 の場合のみ表示 */}
                {formData.is_emote === 1 && (
                    <div id="emote" className="relative flex flex-col mt-6 bg-white px-6 pt-6 pb-3 rounded-xl shadow-lg">
                        <label className="text-lg font-bold text-secondary-800">
                            エモート設定<span className="text-red-500"> *</span>
                        </label>
                        <div className="text-gray-600 text-sm mb-2">
                            エモートID（/e の後に入力するID）を入力してください。<br />
                            例: /e drink の場合、「<span className="font-mono"> drink </span>」と入力
                        </div>
                        <input
                            className="border-b-2 border-b-gray-200 focus:border-b-primary-500 focus:outline-none bg-transparent w-full text-lg"
                            onChange={handleChange}
                            value={formData.emote}
                            type="text"
                            name="emote"
                            maxLength={15}
                            placeholder="drink"
                        />
                        <div className="flex justify-between text-gray-500 mt-1">
                            <div className="text-red-500 font-bold text-sm">
                                {displayError && !formData.emote && uploadError.emote}
                            </div>
                            <div className="text-sm">{formData.emote.length}/15</div>
                        </div>
                    </div>
                )}

                {/* 画像表示設定 - is_image が 1 の場合のみ表示 */}
                {formData.is_image === 1 && (
                    <div id="display_image" className="relative flex flex-col mt-6 bg-white px-6 pt-6 pb-4 rounded-xl shadow-lg">
                        <label className="text-lg font-bold text-secondary-800">
                            表示画像<span className="text-red-500"> *</span>
                        </label>
                        <div className="text-gray-600 text-sm mb-3">使用時に表示する画像をアップロードしてください。</div>

                        <div className="p-4 bg-primary-50 rounded-lg">
                            <div className="text-gray-700 text-sm mb-2">表示する画像をアップロード（PNG形式、10MB以下）</div>
                            <input
                                type="file"
                                accept="image/png"
                                onChange={handleDisplayImageChange}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-lg file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-primary-100 file:text-primary-700
                                    hover:file:bg-primary-200 file:cursor-pointer"
                            />
                            {previewUrls.display_image && (
                                <div className="mt-3">
                                    <p className="text-sm text-gray-600 mb-2">プレビュー:</p>
                                    <img
                                        src={previewUrls.display_image}
                                        alt="Display Preview"
                                        className="max-w-full max-h-48 object-contain border-2 border-primary-300 rounded-lg"
                                    />
                                </div>
                            )}
                            <div className="text-red-500 font-bold text-sm mt-2">
                                {displayError && !files.display_image && uploadError.display_image}
                            </div>
                        </div>
                    </div>
                )}

                {/* 音楽再生設定 - is_audio が 1 の場合のみ表示 */}
                {formData.is_audio === 1 && (
                    <div id="audio_file" className="relative flex flex-col mt-6 bg-white px-6 pt-6 pb-4 rounded-xl shadow-lg">
                        <label className="text-lg font-bold text-secondary-800">
                            音楽ファイル<span className="text-red-500"> *</span>
                        </label>
                        <div className="text-gray-600 text-sm mb-3">使用時に再生する音楽をアップロードしてください。</div>

                        <div className="p-4 bg-primary-50 rounded-lg">
                            <div className="text-gray-700 text-sm mb-2">再生する音楽をアップロード（MP3形式、10MB以下）</div>
                            <input
                                type="file"
                                accept="audio/mpeg"
                                onChange={handleAudioChange}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-lg file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-primary-100 file:text-primary-700
                                    hover:file:bg-primary-200 file:cursor-pointer"
                            />
                            {previewUrls.audio_file && (
                                <div className="mt-3">
                                    <p className="text-sm text-gray-600 mb-2">プレビュー:</p>
                                    <audio controls className="w-full">
                                        <source src={previewUrls.audio_file} type="audio/mpeg" />
                                    </audio>
                                </div>
                            )}
                            <div className="text-red-500 font-bold text-sm mt-2">
                                {displayError && !files.audio_file && uploadError.audio_file}
                            </div>
                        </div>
                    </div>
                )}

                {/* 使用後削除設定 */}
                <div className="relative flex flex-col mt-6 bg-white px-6 pt-6 pb-4 rounded-xl shadow-lg">
                    <label className="text-lg font-bold text-secondary-800">
                        使用後の動作
                    </label>
                    <div className="text-gray-600 text-sm mb-3">
                        アイテム使用後に自動削除しますか？<br />
                        削除しない場合、事前納品時に2.5万円、当日納品時に5万円の追加料金が発生します。
                    </div>

                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="is_remove"
                            checked={formData.is_remove === 1}
                            onChange={handleChange}
                            className="mr-2 w-5 h-5 accent-primary-600"
                        />
                        <span className="font-medium">使用後にアイテムを削除する</span>
                    </label>
                </div>

                {/* 申請ボタン */}
                <button
                    className="mt-8 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                    onClick={(event) => {
                        event.preventDefault();
                        setShowModal(true);
                    }}>
                    申請する
                </button>
            </div>

            <Transition appear show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black opacity-30" />
                    </TransitionChild>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0">
                            <DialogPanel className={`min-w-72 border-8 border-red-500 py-12 px-16 max-md:px-4 rounded-2xl flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-main`}>
                                <div className={`text-2xl font-bold text-red-700`}>
                                    本当に申請しますか？
                                </div>
                                <div className="text-center">
                                    再申請、修正はできません。<br />
                                    内容をよく確認してください。
                                </div>
                                <div className='flex justify-around w-full'>
                                    <button
                                        className="mt-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-3 px-4 xl:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            handleUpload();
                                        }}>
                                        申請する
                                    </button>
                                    <button
                                        className="mt-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 xl:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setShowModal(false);
                                        }}>
                                        キャンセル
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </TransitionChild>
                </Dialog>
            </Transition>
        </div>
    )
}

export default FormV2