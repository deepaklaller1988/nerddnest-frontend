import { AddStoryValidationSchema } from "@/utils/validationSchemas";
import { Field, FieldArray, Form, Formik } from "formik";
import InputField from "../core/InputField";
import { RxCross2 } from "react-icons/rx";
import Button from "../Buttons/Button";
import { IoMdAdd, IoMdSend } from "react-icons/io";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { toasterInfo } from "../core/Toaster";
import { useApi } from "@/hooks/useAPI";
import { uploadFile } from "../core/UploadFile";

interface Story {
  storyLinkText: string;
  storyLink: string;
  storyMedia: File | null; // File or null to account for empty values
  duration: number;
  visibility: string;
  isCollapsed: boolean;
}

interface InitialValues {
  storyCoverImage: File | null;
  storyCoverTitle: string;
  stories: Story[];
}
const CreateStoryModal: React.FC<any> = ({ togglePopup, onAddStory }) => {
  const { API } = useApi();
  const initialValues = {
    storyCoverImage: null,
    storyCoverTitle: "",
    stories: [
      {
        storyLinkText: "",
        storyLink: "",
        storyMedia: null,
        duration: 6,
        visibility: "Everyone",
        isCollapsed: false,
      },
    ],
  };

  const handleAddStory = (values: any) => {

    const storyData = {
      cover: initialValues.storyCoverImage,
      title: initialValues.storyCoverTitle,
      stories: initialValues.stories,
    };
    console.log(storyData)
    onAddStory(storyData);
    togglePopup();
  };


  const handleChange=async(e:any ,setname:any,name:any)=>{
    const file = e.target.files?.[0];
    if (file) {
        try {
            const uploadedUrl = await uploadFile(file,API);
            setname(name, uploadedUrl);
            toasterInfo("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
  }
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
                  <div className="p-5 border-2 border-dashed bg-gray-100/10 border-gray-300/20 rounded-full w-36 h-36 mx-auto flex items-center justify-center mb-4">
                    <label
                      htmlFor="storyCoverImage"
                      className="text-center text-gray-500 cursor-pointer hover:text-green-600"
                    >
                      <p className="text-sm text-white">
                        Drag & Drop your file
                      </p>
                      <p className="text-sm text-white">
                        or{" "}
                        <u className="text-white">Browse</u>
                      </p>
                      <Field
                        type="file"
                        name="storyCoverImage"
                        id="storyCoverImage"
                        className="hidden"
                        // onChange={(e: any) =>
                        //   setFieldValue("storyCoverImage", e.target.files[0])
                        // }
                        onChange={(e:any)=>handleChange(e,setFieldValue,"storyCoverImage")}
                        value={initialValues.storyCoverImage}
                      />
                    </label>
                  </div>
                  <p className="text-center">Recommended sizes: 180x180 px.</p>

                  <div className="mt-4 flex flex-col gap-1">
                    <label
                      htmlFor="storyCoverTitle"
                      className="block text-md font-medium text-white"
                    >
                      Story Cover Title
                    </label>
                    <InputField
                      name="storyCoverTitle"
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
                              htmlFor={`stories[${index}]?.storyLinkText`}
                              className="block text-md font-medium text-white"
                            >
                              Story Link Text
                            </label>

                            <InputField
                              name={`stories[${index}]?.storyLinkText`}
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
                                  <div className="p-6 rounded-xl border-dashed border-2 border-white/10">
                                    <label
                                      htmlFor={`file-upload-${index}`}
                                      className="cursor-pointer py-4 px-6 rounded-md mt-4 flex flex-col gap-1 block text-center transition-all "
                                    >
                                      <span className="text-sm ">
                                        Drag & Drop your file here or
                                      </span>
                                      <span className="text-lg mt-2 ml-1 text-white underline">
                                        Browse
                                      </span>
                                    </label>
                                  </div>
                                  <p className=" mt-2 text-sm">
                                    Allowed types: .jpg, .jpeg, .png, .gif,
                                    .mp4, .mov, .wmv, .avi, .mpeg, .3gp.
                                  </p>
                                </div>
                                <Field
                                  type="file"
                                  name={`stories[${index}].storyMedia`}
                                  onChange={(e: any) =>
                                    setFieldValue(
                                      `stories[${index}].storyMedia`,
                                      e.target.files[0]
                                    )
                                  }
                                  value={
                                    initialValues?.stories[index]?.storyMedia
                                  }
                                  id={`file-upload-${index}`} // Give the input a unique ID
                                  className="hidden" // The input is hidden, but the label will open the file dialog
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
                              storyLinkText: "",
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


