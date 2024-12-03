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
    console.log(file)
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
      <div className="bg-gray-200 w-full max-w-[600px] h-[90%] rounded-[12px] shadow-2xl overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-bold text-gray-800 text-[var(--highlight-blue)]">
            Create Story
          </h2>
          <button
            className="bg-gray-200 w-10 h-10 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-gray-800"
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
            console.log(values, "="),
            (
              <Form className="space-y-6 px-8 py-6 bg-gray-200">
                <div className="bg-white p-8 rounded-xl">
                  <h3 className="text-center text-lg font-semibold mb-4 text-[var(--highlight-blue)]">
                    Story Cover
                  </h3>
                  <div className="border-2 border-dashed bg-gray-100 border-gray-300 rounded-full w-36 h-36 mx-auto flex items-center justify-center mb-4">
                    <label
                      htmlFor="storyCoverImage"
                      className="text-center text-gray-500 cursor-pointer hover:text-green-600"
                    >
                      <p className="text-sm text-[var(--highlight-blue)]">
                        Drag & Drop your file
                      </p>
                      <p className="text-sm text-[var(--highlight-blue)]">
                        or{" "}
                        <u className="text-[var(--highlight-blue)]">Browse</u>
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

                  <div className="mt-4">
                    <label
                      htmlFor="storyCoverTitle"
                      className="block text-md font-medium text-[var(--highlight-blue)]"
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
                          className="bg-white p-8 rounded-xl mb-4 border border-gray-300"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-[var(--highlight-blue)] mb-4">
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

                          <div className="mt-4">
                            <label
                              htmlFor={`stories[${index}]?.storyLinkText`}
                              className="block text-md font-medium text-[var(--highlight-blue)]"
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
                              <div className="mt-4">
                                <label
                                  htmlFor={`stories[${index}].storyLink`}
                                  className="block text-md font-medium text-[var(--highlight-blue)]"
                                >
                                  Story Link
                                </label>
                                <InputField
                                  name={`stories[${index}].storyLink`}
                                  type="url"
                                  placeholder="Enter the story link"
                                />
                              </div>

                              <div className="mt-4">
                                <label
                                  htmlFor={`stories[${index}].storyMedia`}
                                  className="block text-md font-medium text-[var(--highlight-blue)]"
                                >
                                  Story Media (Image/Video)
                                </label>
                                <div className="bg-gray-50 p-8 rounded-xl shadow-md">
                                  <div className="p-6 bg-gray-100 rounded-xl border-dashed border-2 border-gray-300">
                                    <label
                                      htmlFor={`file-upload-${index}`}
                                      className="cursor-pointer text-[var(--highlight-blue)] py-4 px-6 rounded-md mt-4 block text-center transition-all "
                                    >
                                      <span className="text-sm text-[var(--highlight)]">
                                        Drag & Drop your file here or
                                      </span>
                                      <span className="text-sm mt-2 ml-1 text-[var(--highlight)] underline">
                                        Browse
                                      </span>
                                    </label>
                                  </div>
                                  <p className="text-black mt-6 text-sm">
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

                              <div className="mt-4">
                                <label
                                  htmlFor={`stories[${index}].duration`}
                                  className="block text-md font-medium text-[var(--highlight-blue)]"
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

                              <div className="mt-4">
                                <label
                                  htmlFor={`stories[${index}].visibility`}
                                  className="block text-md font-medium text-[var(--highlight-blue)]"
                                >
                                  Visibility
                                </label>
                                <Field
                                  as="select"
                                  name={`stories[${index}].visibility`}
                                  className="w-full mt-1 border border-gray-300 rounded-lg p-4"
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

                      <div className="flex flex-row items-center gap-2">
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


