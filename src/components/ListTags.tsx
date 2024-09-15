interface IListTagsProps {
  tags: string[];
}

export function ListTags({ tags }: IListTagsProps) {
  return tags.length > 0 ? (
    <div className="cocktail-tags">
      {tags.map((tag) => (
        <p className="cocktail-tag" key={tag}>
          {tag}
        </p>
      ))}
    </div>
  ) : null;
}
