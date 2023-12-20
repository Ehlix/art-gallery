type Props = {
  params: { id: string }
};

const ProjectIdPage = ({params}: Props) => {
  return (
    <div>
      <div>
        {params.id}
      </div>
      vip
    </div>
  );
};

export default ProjectIdPage;