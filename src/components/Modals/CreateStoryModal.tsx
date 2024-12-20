import { AddStoryValidationSchema } from "@/utils/validationSchemas";
import { Field, FieldArray, Form, Formik } from "formik";
import InputField from "../core/InputField";
import { RxCross2 } from "react-icons/rx";
import Button from "../Buttons/Button";
import { IoMdAdd, IoMdSend } from "react-icons/io";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { toasterError, toasterSuccess } from "../core/Toaster";
import { useApi } from "@/hooks/useAPI";
import { uploadFile } from "../core/UploadFile";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setStoryData } from "../../redux/slices/data.slice";


const CreateStoryModal: React.FC<any> = ({ togglePopup }) => {
  const { API } = useApi();
  const dispatch = useDispatch();

  const userId = useSelector((state: any) => state.auth.id);
  const [coverImage, setCoverImage] = useState<any>(null)
  const [storyMedia, setStoryMedia] = useState<(string | undefined)[]>([]);
  const [storyData, setStoriesData] = useState<(string | undefined)[]>([]);
  const [loadingCoverImage, setLoadingCoverImage] = useState(false);
  const [loadingstoryMedia, setLoadingstoryMedia] = useState<boolean[]>([]);

  const initialValues = {
    userId: userId,
    storyCoverImage: "",
    coverTitle: "",
    stories: [
      {
        storyText: "",
        storyLink: "",
        storyMedia: "",
        duration: 6,
        visibility: "public",
        isCollapsed: false,
      },
    ],
  };

  useEffect(() => {
    if (userId) {
      getStoryData()

    }
  }, [userId])

  const getStoryData = async () => {
    if (userId) {
      const { success, error, data } = await API.get(`story/get-story-covers?userId=${userId}`);
      if (success) {
        setStoriesData(data)
      }
      else {
        console.log(error);
      }
    }
  };

  const handleDeleteStories = async (deleteItemId: any) => {
    try {
      const response = await API.delete(`story/delete-story-covers`, { id: deleteItemId, userId });
      if (response.success) {
        toasterSuccess("Story has been deleted successfully");
        getStoryData()
      } else {
        toasterError("Failed to delete the post");
      }
    } catch (error) {
      toasterError("An error occurred while deleting the post");
    }
  };

  const handleAddStory = async (values: any, setFieldValue: any) => {
    const hasValidStories = values.stories.some(
      (story: any) => story.storyText || story.storyLink || story.storyMedia
    );
  
    if (!hasValidStories) {
      toasterError("Please add at least one story before submitting.");
      return;
    }
  
    const updatedValues = {
      ...values,
      storyCoverImage: values.storyCoverImage,
      mediaUrl: values.storyCoverImage,
      stories: values.stories.map((story: any) => ({
        ...story,
        mediaUrl: story.storyMedia,
      })),
    };
  
    try {
      const { data, success, error } = await API.post("story/create", updatedValues);
      if (success) {
        toasterSuccess("Story Created Successfully!", 2000, "id");
        dispatch(setStoryData(data));
        togglePopup();
      } else {
        toasterError(error || "Failed to Create Story");
      }
    } catch (err) {
      console.error("Error posting story:", err);
      toasterError("An error occurred while posting the story");
    }
  };
  
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    fieldName: string,
    setLoading: any,
    index?: number
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      try {
        let uploadData: any;
        if (fieldName === "storyCoverImage") {
          setLoading(true);

          uploadData = await uploadFile(file, API);
          setLoading(false);

          setFieldValue(fieldName, uploadData);
          setCoverImage(uploadData);
        } else if (fieldName.startsWith("stories")) {
          if (index !== undefined) {
            setLoading((prevState: boolean[]) => {
              const updatedState = [...prevState];
              updatedState[index] = true;
              return updatedState;
            });
            uploadData = await uploadFile(file, API);
            setFieldValue(`stories[${index}].storyMedia`, uploadData);
            setLoading((prevState: boolean[]) => {
              const updatedState = [...prevState];
              updatedState[index] = false;
              return updatedState;
            });
            setStoryMedia((prevState: any) => {
              const updatedMedia = [...prevState];
              updatedMedia[index] = uploadData;
              return updatedMedia;
            });
          }
        }
      } catch (err) {
        console.error("Error uploading file:", err);
      } finally {
        if (typeof setLoading === 'function' && index !== undefined) {
          setLoading((prevState: boolean[]) => {
            const updatedState = [...prevState];
            updatedState[index] = false;
            return updatedState;
          });
        } else if (typeof setLoading === 'boolean') {
          setLoading = false;
        }
      }
    }
  };

  const handleDelete = (setFieldValue: (field: string, value: any) => void, fieldName: string, index?: number) => {
    if (fieldName === "storyCoverImage") {
      setFieldValue(fieldName, "");
      setCoverImage(null);
    } else if (fieldName.startsWith("stories")) {
      const storyIndex = index ?? 0;
      setFieldValue(`stories[${storyIndex}].storyMedia`, "");
      setStoryMedia((prevMedia: any) => {
        const updatedMedia = [...prevMedia];
        updatedMedia[storyIndex] = null;
        return updatedMedia;
      });
    }
  };
console.log(storyMedia,"storyMedia")
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

        {storyData && storyData.map((item: any, index: any) => (
          <div className="mt-4 px-4"  key={index}>
            <div className="gap-2 flex flex-row bg-[var(--bgh)] rounded-lg p-[10px] w-full placeholder:text-[var(--foreground)]">
              <img
                src={item?.media_url}
                alt="Profile Image"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-grow">
                <p className="font-semibold text-white">Name: <span className="font-normal">{item?.cover_title}</span></p>
                <p className="text-sm text-gray-500">Date: {item.createdAt?.substring(0, 10)}</p>
              </div>

              <button
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Close"
                onClick={() => handleDeleteStories(item.id)}
              >
                <IoCloseCircle size={24} />
              </button>

            </div>
          </div>

        ))}

        <Formik
          initialValues={initialValues}
          validationSchema={AddStoryValidationSchema}
          onSubmit={handleAddStory}
        >
          {({ values, setFieldValue }) => (
            (
              <Form className="space-y-6 p-4" onSubmit={(e) => { e.preventDefault(); handleAddStory(values, setFieldValue); }}>
                <div className="">
                  <h3 className="text-center text-lg font-semibold mb-4 text-white">
                    Story Cover
                  </h3>
                  <div className="p-5 border-2 border-dashed bg-gray-100/10 border-gray-300/20 rounded-full w-36 h-36 mx-auto flex items-center justify-center mb-4 relative">
                    {loadingCoverImage ? (
                      <div className="flex justify-center items-center w-full h-full">
                        <img src="/spinner.gif" alt="Loading..." className="w-12 h-12" />
                      </div>
                    ) : coverImage ? (
                      <div className="relative w-full h-full">
                        <img
                          src={coverImage}
                          alt="Uploaded Preview"
                          className="w-full h-full object-cover rounded-full"
                        />
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
                          accept="images/*"
                          className="hidden"
                          onChange={(e: any) => handleFileChange(e, setFieldValue, "storyCoverImage", setLoadingCoverImage)}
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
                      {values?.stories?.map((story: any, index: any) => (
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
                                    {loadingstoryMedia[index] ? (
                                      <div className="flex justify-center items-center w-full h-full">
                                        <img src="/spinner.gif" alt="Loading..." className="w-12 h-12" />
                                      </div>
                                    ) : storyMedia && storyMedia[index] ? (
                                      <div className="relative">
                                        {storyMedia[index].includes("videos") ? (
                                          <video
                                            src={storyMedia[index]}
                                            className="w-full h-64 rounded-xl object-cover"
                                            controls
                                          />
                                        ) : (
                                          <img
                                            src={storyMedia[index]}
                                            alt="Uploaded Preview"
                                            className="w-full h-64 rounded-xl object-cover"
                                          />
                                        )}
                                        <button
                                          type="button"
                                          onClick={() => handleDelete(setFieldValue, `stories[${index}].storyMedia`, index)}
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
                                  onChange={(e: any) => handleFileChange(e, setFieldValue, `stories[${index}].storyMedia`, setLoadingstoryMedia, index)}  // Pass index here
                                  accept="image/*,video/*"
                                  value={initialValues?.stories[index]?.storyMedia || ""}
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
                                  value={values.stories[index].visibility || 'public'}
                                  className="bg-[var(--bgh)] rounded-lg p-[10px] w-full placeholder:text-[var(--foreground)]"
                                >
                                  <option value="public">Everyone</option>
                                  <option value="connections">Friends</option>
                                  <option value="only-me">Private</option>
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
                              visibility: "public",
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