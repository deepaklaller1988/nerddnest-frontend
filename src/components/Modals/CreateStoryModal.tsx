import { AddStoryValidationSchema } from "@/utils/validationSchemas";
import { Field, FieldArray, Form, Formik } from "formik";
import InputField from "../core/InputField";
import { RxCross2 } from "react-icons/rx";
import Button from "../Buttons/Button";
import { IoMdAdd, IoMdSend } from "react-icons/io";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { toasterError, toasterInfo, toasterSuccess } from "../core/Toaster";
import { useApi } from "@/hooks/useAPI";
import { uploadMultiFile } from "../core/UploadFile";
import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

interface Story {
  storyText: string;
  storyLink: string;
  storyMedia: File | null; // File or null to account for empty values
  duration: number;
  visibility: string;
  isCollapsed: boolean;
}

interface InitialValues {
  storyCoverImage: File | null;
  coverTitle: string;
  stories: Story[];
}
const CreateStoryModal: React.FC<any> = ({ togglePopup, onAddStory }) => {
  const { API } = useApi();
  const userId = useSelector((state: any) => state.auth.id);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const initialValues = {
    userId:userId,
    storyCoverImage: null,
    coverTitle: "",
    stories: [
      {
        storyText: "",
        storyLink: "",
        storyMedia: null,
        duration: 6,
        visibility: "Everyone",
        isCollapsed: false,
      },
    ],
  };

  const handleAddStory = async () => {
      console.log(initialValues); // Debug values here

    try {
      const { success, error } = await API.post("story/create", {
        initialValues
      });
      if (success) {

        toasterSuccess("Add Story Created SuccessFully !", 2000, "id")
      } else {
        toasterError(error || "Failed to Create comment");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      toasterError("An error occurred while posting the comment");
    }
  };


  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>, 
    setFieldValue: any, 
    fieldName: string, 
    setFilePreview: any,
    setStoryMedia: any,
    isCoverImage: boolean,  
    storyIndex?: number  
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      if (isCoverImage) {
        setFieldValue(fieldName, file);
        const reader = new FileReader();
        reader.onload = (event) => {
          setFilePreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        const newFiles = Array.from(files);
        const uploadData = await uploadMultiFile(newFiles, API);  
  
        const updatedStoryMedia = { ...setStoryMedia };
  
        if (storyIndex !== undefined) {
          updatedStoryMedia[storyIndex] = uploadData; 
          setStoryMedia(updatedStoryMedia);
        }
      }
    }
  };

  const handleDelete = (setFieldValue: any, fieldName: string) => {
    setFilePreview(null); 
    setFieldValue(fieldName, null); 
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[80vh] overflow-auto bg-[var(--sections)] border border-white/10 w-full max-w-[600px] rounded-[12px] shadow-lg">
        <div className="flex items-center justify-between  p-4 border-b border-white/5">
          <h2 className=" uppercase font-semibold text-center block text-white">
            Create Story
          </h2>
          <button
            className="w-7 h-7 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-white"
            onClick={togglePopup}
          >
            &times;
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={AddStoryValidationSchema}
          onSubmit={handleAddStory}
        >
          {({ values, setFieldValue }) => (
            (
              <Form className="space-y-6 p-4">
                <div className="">
                  <h3 className="text-center text-lg font-semibold mb-4 text-white">
                    Story Cover
                  </h3>
                  <div className="p-5 border-2 border-dashed bg-gray-100/10 border-gray-300/20 rounded-full w-36 h-36 mx-auto flex items-center justify-center mb-4 relative">
                    {filePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={filePreview}
                          alt="Uploaded Preview"
                          className="w-full h-full object-cover rounded-full"
                        />
                        {/* Cross Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(setFieldValue, "storyCoverImage")}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-800"
                          title="Remove Image"
                        >
                          <IoCloseCircle size={24} />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="storyCoverImage"
                        className="text-center text-gray-500 cursor-pointer hover:text-green-600 flex flex-col items-center justify-center"
                      >
                        <p className="text-sm text-white">Drag & Drop your file</p>
                        <p className="text-sm text-white">
                          or <u className="text-white">Browse</u>
                        </p>
                        <Field
                          type="file"
                          name="storyCoverImage"
                          id="storyCoverImage"
                          className="hidden"
                          onChange={(e:any) => handleFileChange(e, setFieldValue, "storyCoverImage", setFilePreview, setStoryMedia, true)}
                          value={initialValues.storyCoverImage}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-center">Recommended sizes: 180x180 px.</p>

                  <div className="mt-4 flex flex-col gap-1">
                    <label
                      htmlFor="coverTitle"
                      className="block text-md font-medium text-white"
                    >
                      Story Cover Title
                    </label>
                    <InputField
                      name="coverTitle"
                      type="text"
                      placeholder="Enter Story Cover Title"
                    />
                  </div>
                </div>

                <FieldArray name="stories">
                  {({ push, remove }) => (
                    <div>
                      {values.stories.map((story, index) => (
                        <div
                          key={index}
                          className="rounded-lg mb-4"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white mb-4">
                              Story {index + 1}
                            </h3>
                            <div className="flex gap-4">
                              <button
                                className="cursor-pointer hover:rounded-full hover:bg-gray-200 hover:p-1"
                                onClick={() => {
                                  const newStories = [...values.stories];
                                  newStories[index].isCollapsed =
                                    !newStories[index].isCollapsed;
                                  setFieldValue("stories", newStories);
                                }}
                              >
                                <HiOutlineChevronUpDown />
                              </button>
                              {index !== 0 && (
                                <button
                                  className="cursor-pointer hover:rounded-full hover:bg-gray-200 hover:p-1"
                                  onClick={() => remove(index)}
                                >
                                  <RxCross2 />
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 flex flex-col gap-1">
                            <label
                              htmlFor={`stories[${index}].storyText`}
                              className="block text-md font-medium text-white"
                            >
                              Story Link Text
                            </label>

                            <InputField
                              name={`stories[${index}].storyText`}
                              type="text"
                              placeholder="Enter link text"
                            />
                          </div>

                          {!story.isCollapsed && (
                            <>
                              <div className="mt-4 flex flex-col gap-1">
                                <label
                                  htmlFor={`stories[${index}].storyLink`}
                                  className="block text-md font-medium text-white"
                                >
                                  Story Link
                                </label>
                                <InputField
                                  name={`stories[${index}].storyLink`}
                                  type="url"
                                  placeholder="Enter the story link"
                                />
                              </div>

                              <div className="mt-4 flex flex-col gap-1">
                                <label
                                  htmlFor={`stories[${index}].storyMedia`}
                                  className="block text-md font-medium text-white"
                                >
                                  Story Media (Image/Video)
                                </label>
                                <div className="">
                                  <div className="p-6 rounded-xl border-dashed border-2 border-white/10 relative">
                                    {filePreview ? (
                                      <div className="relative">
                                        {/* Inline Preview */}
                                        {filePreview.startsWith("data:video/") ? (
                                          <video
                                            src={filePreview}
                                            className="w-full h-64 rounded-xl object-cover"
                                            controls
                                          />
                                        ) : (
                                          <img
                                            src={filePreview}
                                            alt="Uploaded Preview"
                                            className="w-full h-64 rounded-xl object-cover"
                                          />
                                        )}
                                        {/* Cross Button */}
                                        <button
                                          type="button"
                                          onClick={() => handleDelete(setFieldValue, `stories[${index}].storyMedia`)}
                                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-800"
                                          title="Remove File"
                                        >
                                          <IoCloseCircle size={24} />
                                        </button>
                                      </div>
                                    ) : (
                                      <label
                                        htmlFor={`file-upload-${index}`}
                                        className="cursor-pointer py-4 px-6 rounded-md mt-4 flex flex-col gap-1 block text-center transition-all"
                                      >
                                        <span className="text-sm">Drag & Drop your file here or</span>
                                        <span className="text-lg mt-2 ml-1 text-white underline">
                                          Browse
                                        </span>
                                      </label>
                                    )}
                                  </div>
                                  <p className="mt-2 text-sm">
                                    Allowed types: .jpg, .jpeg, .png, .gif, .mp4, .mov, .wmv, .avi, .mpeg,
                                    .3gp.
                                  </p>
                                </div>
                                <Field
                                  type="file"
                                  name={`stories[${index}].storyMedia`}
                                  onChange={(e:any) => handleFileChange(e, setFieldValue, `stories[${index}].storyMedia`, setFilePreview, setStoryMedia, false, index)}

                                  value={initialValues?.stories[index]?.storyMedia}
                                  id={`file-upload-${index}`}
                                  className="hidden"
                                />
                              </div>

                              <div className="mt-4 flex flex-col gap-1">
                                <label
                                  htmlFor={`stories[${index}].duration`}
                                  className="block text-md font-medium text-white"
                                >
                                  Duration (seconds)
                                </label>
                                <InputField
                                  name={`stories[${index}].duration`}
                                  type="number"
                                  min={1}
                                  placeholder="Enter duration"
                                />
                              </div>

                              <div className="mt-4 flex flex-col gap-1">
                                <label
                                  htmlFor={`stories[${index}].visibility`}
                                  className="block text-md font-medium text-white"
                                >
                                  Visibility
                                </label>
                                <Field
                                  as="select"
                                  name={`stories[${index}].visibility`}
                                  className="bg-[var(--bgh)] rounded-lg p-[10px] w-full placeholder:text-[var(--foreground)]"
                                >
                                  <option value="Everyone">Everyone</option>
                                  <option value="Friends">Friends</option>
                                  <option value="Private">Private</option>
                                </Field>
                              </div>
                            </>
                          )}
                        </div>
                      ))}

                      <div className="flex flex-row items-center gap-2 mt-2">
                        <Button
                          type="button"
                          label="Add Another Story"
                          icon={<IoMdAdd className="fill-white" />}
                          onClick={() => {
                            push({
                              storyText: "",
                              storyLink: "",
                              storyMedia: null,
                              duration: 6,
                              visibility: "Everyone",
                              isCollapsed: false,
                            });
                          }}
                        />

                        <Button
                          type="submit"
                          label={"Publish"}
                          icon={<IoMdSend className="fill-white" />}
                          variant="default"
                        />
                      </div>
                    </div>
                  )}
                </FieldArray>
              </Form>
            )
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateStoryModal;


