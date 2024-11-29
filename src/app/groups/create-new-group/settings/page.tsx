const RadioGroup = ({ name, options }: any) => (
  <div className="mb-4">
    {options.map((option: any, index: any) => (
      <div key={index} className="space-y-2">
        <label className="flex items-start space-x-4 my-2">
          <input
            type="radio"
            name={name}
            className="mt-[1px] h-5 w-5 active:text-[var(--highlight-blue)]"
            
          />
          <div>
            <h3 className="font-semibold text-black">
              {option.label}
            </h3>
          </div>
        </label>
        {option.list && (
          <ul className="pl-8   list-disc">
            {option.list.map((item: string, listIndex: number) => (
              <li key={listIndex} className="">{item}</li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);


export default function Settings() {
  return (
    <div className="p-6">
      <h2 className=" text-[var(--highlight)] mb-4 font-bold text-[20px]">Privacy Options</h2>

      <RadioGroup
        name="public"
        options={[
          {
            label: "This is a public group",
            fontWeight: "sm",
            list: [
              "Any site member can join this group.",
              "This group will be listed in the groups directory and in search results.",
              "Group content and activity will be visible to any site member.",
            ],
          },
        ]}
      />

      {/* Private Group */}
      <RadioGroup
        name="private"
        options={[
          {
            label: "This is a private group",
            fontWeight: "sm",
            list: [
              "Only people who request membership and are accepted can join the group.",
              "This group will be listed in the groups directory and in search results.",
              "Group content and activity will only be visible to members of the group.",
            ],
          },
        ]}
      />

      {/* Hidden Group */}
      <RadioGroup
        name="hidden"
        options={[
          {
            label: "This is a hidden group",
            fontWeight: "sm",
            list: [
              "Only people who are invited can join the group.",
              "This group will not be listed in the groups directory or search results",
              "Group content and activity will only be visible to members of the group.",
            ],
          },
        
        ]}
      />

      {/* Group Invitations */}
      <h2 className=" text-[var(--highlight)] border-b pb-4 pt-5">
        Group Invitations
      </h2>
      <h2 className=" mt-4">Which members of this group are allowed to invite others?</h2>
      <RadioGroup
        name="invitations"
        options={[
          { label: "All group members", fontWeight: "sm" },
          { label: "Organizers and Moderators only", fontWeight: "sm" },
          { label: "Organizers only", fontWeight: "sm" },
        ]}
      />

      {/* Activity Feeds */}
      <h2 className=" text-[var(--highlight)] border-b pb-4 pt-5">
        Activity Feeds
      </h2>
      <h2 className=" mt-4 p-2">
        Which members of this group are allowed to post into the activity feed?
      </h2>
      <RadioGroup
        name="activity"
        options={[
          { label: "All group members", fontWeight: "sm" },
          { label: "Organizers and Moderators only", fontWeight: "sm" },
          { label: "Organizers only", fontWeight: "sm" },
        ]}
      />

      {/* Group Photos */}
      <h2 className=" text-[var(--highlight)] border-b pb-4 pt-5">Group Photos</h2>
      <h2 className=" mt-4 p-2">Which members of this group are allowed to upload photos?</h2>
      <RadioGroup
        name="photos"
        options={[
          { label: "All group members", fontWeight: "sm" },
          { label: "Organizers and Moderators only", fontWeight: "sm" },
          { label: "Organizers only", fontWeight: "sm" },
        ]}
      />

      {/* Group Albums */}
      <h2 className=" text-[var(--highlight)] border-b pb-4 pt-5">Group Albums</h2>
      <h2 className=" mt-4 p-2">Which members of this group are allowed to create albums?</h2>
      <RadioGroup
        name="albums"
        options={[
          { label: "All group members", fontWeight: "sm" },
          { label: "Organizers and Moderators only", fontWeight: "sm" },
          { label: "Organizers only", fontWeight: "sm" },
        ]}
      />

      {/* Group Documents */}
      <h2 className=" text-[var(--highlight)] border-b pb-4 pt-5">
        Group Documents
      </h2>
      <h2 className=" mt-4 p-2">Which members of this group are allowed to upload documents?</h2>
      <RadioGroup
        name="documents"
        options={[
          { label: "All group members", fontWeight: "sm" },
          { label: "Organizers and Moderators only", fontWeight: "sm" },
          { label: "Organizers only", fontWeight: "sm" },
        ]}
      />

      {/* Group Videos */}
      <h2 className=" text-[var(--highlight)] border-b pb-4 pt-5">Group Videos</h2>
      <h2 className=" mt-4 p-2">Which members of this group are allowed to upload videos?</h2>
      <RadioGroup
        name="videos"
        options={[
          { label: "All group members", fontWeight: "sm" },
          { label: "Organizers and Moderators only", fontWeight: "sm" },
          { label: "Organizers only", fontWeight: "sm" },
        ]}
      />
    </div>
  );
}
