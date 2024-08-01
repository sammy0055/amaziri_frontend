import {
  Heading,
  Heading3,
  LabelParagraph,
} from "@/app/component/atom/headings";
import styles from "./index.module.scss";
import { actions, allActions } from "@/data/workflow/actions/action-data";
import { SidebarItem } from "@/app/component/modules/sidebar";
import { IconAndLabel } from "@/app/component/molecules/IconAndText";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { TbWaveSawTool } from "react-icons/tb";
import { RiGalleryView2 } from "react-icons/ri";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import {  MyNode } from "@/types/workflow";
import { useWorkflow } from "@/app/hooks/workflow";
import { useOpenAndClosePopUp } from "@/app/state-management/utility-state";

const iconArray: { [key: string]: IconType } = {
  contentCreation: VscGitPullRequestCreate,
  tooling: TbWaveSawTool,
  allActions: RiGalleryView2,
};

export const ActionListing = () => {
  const [apps, setApps] = useState<MyNode[]>();
  const [activeCategory, setActiveCategory] = useState("allActions");
  const { categories } = actions;
  const _categories = Object.keys(categories);

  useEffect(() => {
    setApps(allActions);
  }, []);

  const handleSelectCategory = (category: string) => {
    if (category === "allActions") setApps(allActions);
    else setApps(categories[category]);
    setActiveCategory(category);
  };

  return (
    <div className={styles["Container"]}>
      <div className={styles["Controls"]}>
        <Heading customStyles={styles["Heading"]}>add action</Heading>
        <ActionCategory
          categories={_categories}
          select={handleSelectCategory}
        />
      </div>
      <div className={styles["ListingArea"]}>
        <div className={styles["ListingAreaHead"]}>
          <IconAndLabel
            text={activeCategory}
            Icon={iconArray[activeCategory]}
          />
        </div>
        <div className={styles["ListingAreaText"]}>
          {apps?.map((app) => (
            <ActionContainer key={app.id} node={app} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ActionCategory = ({
  categories,
  select,
}: {
  categories: string[];
  select: (category: string) => void;
}) => {
  return (
    <SidebarItem label="general">
      <div onClick={() => select("allActions")}>
        <IconAndLabel
          text="All Actions"
          Icon={RiGalleryView2}
          customStyles={styles["IconAndLabelCustomStyle"]}
        />
      </div>
      {categories.map((item, index) => (
        <div key={index} onClick={() => select(item)}>
          <IconAndLabel
            text={item}
            Icon={iconArray[item]}
            customStyles={styles["IconAndLabelCustomStyle"]}
          />
        </div>
      ))}
    </SidebarItem>
  );
};

interface ActionContainerProps {
  node: MyNode;
}
const ActionContainer = ({ node }: ActionContainerProps) => {
  const { HandleSelectNode } = useWorkflow();
  const [open, setOpen] = useOpenAndClosePopUp();
  const handleOnClick = () => {
    HandleSelectNode(node);
    setOpen(!open);
  };
  return (
    <div className={styles["ActionContainer"]} onClick={handleOnClick}>
      <RiGalleryView2 size={20} />
      <div className={styles["ActionContainerTextWrapper"]}>
        <Heading3>{node.data.actionName}</Heading3>
        <LabelParagraph customStyles={styles["ActionContainerParagraph"]}>
          {node.data.description}
        </LabelParagraph>
      </div>
    </div>
  );
};
