import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  FaArrowRight,
  FaCrown,
  FaExternalLinkSquareAlt,
  FaGithub,
} from "react-icons/fa";
import { CardTitle } from "./card";
import { formatAsMonthDate } from "../lib/date";
import { InlineText } from "./typography";

export const ProjectCard = ({ project }) => (
  <LinkBox display="flex" alignItems="stretch">
    <Card w="100%" backgroundColor="white" variant="outline">
      <CardBody>
        <Image
          borderWidth={1}
          borderStyle="solid"
          mb={6}
          borderRadius="lg"
          objectFit="cover"
          w="100%"
          h="185px"
          src={project.frontMatter.photo}
          alt={project.frontMatter["photo-alt"]}
        />

        <CardTitle level={3}>{project.frontMatter.title}</CardTitle>
        <Text textStyle="subtitle">
          <InlineText>{formatAsMonthDate(project.frontMatter.date)}</InlineText>
          {project.frontMatter.featured && (
            <InlineText>
              <InlineText color="yellow.600" ml={2}>
                <InlineText display="inline-block" mr={2}>
                  <FaCrown />
                </InlineText>
                <VisuallyHidden>Featured</VisuallyHidden>
              </InlineText>
            </InlineText>
          )}
        </Text>
        <Text noOfLines={3}>{project.frontMatter.description}</Text>
      </CardBody>

      <CardFooter pt={0}>
        <ButtonGroup>
          <NextLink
            href={project.href}
            passHref
            // FIXME find a way to do this without double anchor or legacy mode.
            legacyBehavior
          >
            <LinkOverlay>
              <Button variant="outline" as="span" rightIcon={<FaArrowRight />}>
                Read
              </Button>
            </LinkOverlay>
          </NextLink>
          {project.frontMatter.repo && project.frontMatter.username && (
            <IconButton
              as="a"
              href={new URL(
                `/${project.frontMatter.username}/${project.frontMatter.repo}`,
                `https://github.com`
              ).toString()}
              variant="ghost"
              aria-label={`GitHub Repository for ${project.frontMatter.title}`}
              icon={<FaGithub />}
            />
          )}
          {project.frontMatter.webpage && (
            <IconButton
              as="a"
              href={project.frontMatter.webpage}
              variant="ghost"
              aria-label={`Webpage for ${project.frontMatter.title}`}
              icon={<FaExternalLinkSquareAlt />}
            />
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  </LinkBox>
);

export const ProjectCollection = ({ projects, columns = [1, 2, null, 3] }) => (
  <SimpleGrid columns={columns} spacing={6}>
    {projects.map((project) => (
      <ProjectCard project={project} key={project.filePath} />
    ))}
  </SimpleGrid>
);
