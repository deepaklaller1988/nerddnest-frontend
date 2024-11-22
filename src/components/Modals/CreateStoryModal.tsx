import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputField from "../core/InputField";
import { AddStoryValidationSchema } from "@/utils/validationSchemas";
import { StoryFormValues } from "@/types/storyInterface";
import Button from "../Buttons/Button";
import { IoMdAdd } from "react-icons/io";
import { IoMdSend } from "react-icons/io";

const CreateStoryModal: any = ({ togglePopup, onAddStory }: any) => {
  const initialValues: StoryFormValues = {
    storyCoverImage: null,
    storyCoverTitle: "",
    storyLinkText: "",
    storyLink: "",
    storyMedia: null,
    duration: 6,
    visibility: "Everyone",
  };

  const handleAddStory = (values: StoryFormValues) => {
    onAddStory({
      id: Date.now(),
      title: values.storyCoverTitle,
      image: values.storyCoverImage,
      logo: values.storyMedia,
      link: values.storyLink,
      duration: values.duration,
      visibility: values.visibility,
    });
    togglePopup();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-gray-200 w-full max-w-[600px] h-[90%] rounded-[12px] shadow-2xl overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b ">
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
          {({ setFieldValue,errors,values }) => (
            <Form className="space-y-6 px-8 py-6  bg-gray-200">
              <div className="bg-white p-8 rounded-xl">
                <h3 className="text-center text-lg font-semibold mb-4 text-[var(--highlight-blue)]">
                  Story Cover Image
                </h3>

                <div className="border-2 border-dashed bg-gray-100 border-gray-300 rounded-full w-36 h-36 mx-auto flex items-center justify-center mb-4">
                  <label
                    htmlFor="file-upload"
                    className="text-center text-gray-500  cursor-pointer hover:text-green-600"
                  >
                    <p className="text-sm text-[var(--highlight-blue)]">
                      Drag & Drop your file
                    </p>
                    <p className="text-sm text-[var(--highlight-blue)]">
                      or <u className="text-[var(--highlight-blue)]">Browse</u>
                    </p>
                    <Field
                      type="file"
                      name="storyCoverImage"
                      id="file-upload"
                      className="hidden"
                      onChange={(e: any) =>
                        setFieldValue("storyCoverImage", e.target.files[0])
                      }
                      value={initialValues.storyCoverImage}
                    />
                  </label>
                </div>
                <p className="text-center">Recommended sizes: 180x180 px.</p>
                <ErrorMessage
                  name="storyCoverImage"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

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

              <div className="bg-white p-8 rounded-xl">
                <div>
                  <label
                    htmlFor="storyLinkText"
                    className="block text-md font-medium text-[var(--highlight-blue)]"
                  >
                    Story Link Text
                  </label>
                  <InputField
                    name="storyLinkText"
                    type="text"
                    placeholder="Enter link text"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="storyLink"
                    className="block text-md font-medium text-[var(--highlight-blue)]"
                  >
                    Story Link
                  </label>
                  <InputField
                    name="storyLink"
                    type="url"
                    placeholder="Enter the story link"
                  />
                </div>
                <p>Ie: "See Article"</p>
                <div className="mt-4">
                  <label
                    htmlFor="file-upload1"
                    className="block text-md font-medium text-[var(--highlight-blue)]"
                  >
                    Story Media (Image/Video)
                  </label>

                  <div className="bg-gray-50 p-8 rounded-xl">
                    <div className="p-4 bg-gray-200 rounded-xl">
                      <label
                        htmlFor="file-upload1"
                        className="cursor-pointer text-[var(--highlight-blue)] py-2 px-4 rounded-md mt-2 block text-center transition-all"
                      >
                        Drag & Drop your file or Browser
                      </label>
                    </div>
                    <p className="text-black mt-6">
                      Allowed types: .jpg, .jpeg, .png, .gif, .mp4, .mov, .wmv,
                      .avi, .mpeg, .3gp.
                    </p>
                    
                  </div>

                  <Field
                    type="file"
                    name="storyMedia"
                    id="file-upload1"
                    className="hidden"
                   
                    onChange={(e: any) =>
                      setFieldValue(
                        "storyMedia",
                        e.target.files[0]
                      )
                      
                    }
                    value={initialValues.storyMedia}
                  />
                  
                  <ErrorMessage
                    name="storyMedia"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                    <p>Recommended sizes: 1080x1920 px.</p>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="duration"
                    className="block text-md font-medium text-[var(--highlight-blue)]"
                  >
                    Duration (seconds)
                  </label>
                  <InputField
                    name="duration"
                    min={1}
                    type="number"
                    placeholder="Duration (seconds)"
                  />
                </div>

                <div className="mt-4 ">
                  <label
                    htmlFor="visibility"
                    className="block text-md font-medium text-[var(--highlight-blue)]"
                  >
                    Visibility
                  </label>
                  <select
                    id="visibility"
                    name="visibility"
                    onChange={(e) =>
                      setFieldValue("visibility", e.target.value)
                    }
                    className="w-full mt-1 border border-gray-300 rounded-lg p-4"
                  >
                    <option value="Everyone">Everyone</option>
                    <option value="Friends">Friends</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  label={"Add Story"}
                  icon={<IoMdAdd className="fill-white" />}
                  variant="default"
                />
                <Button
                  type="submit"
                  label={"Publish"}
                  icon={<IoMdSend className="fill-white" />}
                  variant="default"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateStoryModal;
